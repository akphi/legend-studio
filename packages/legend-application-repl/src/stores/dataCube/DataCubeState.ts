/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { REPLStore } from './REPLStore.js';
import { DataCubeGridState } from './grid/DataCubeGridState.js';
import { DataCubeEditorState } from './editor/DataCubeEditorState.js';
import { assertErrorThrown, uuid } from '@finos/legend-shared';
import { DataCubeEngine } from './core/DataCubeEngine.js';
import { DataCubeQuerySnapshotManager } from './core/DataCubeQuerySnapshotManager.js';
import type { LegendREPLApplicationStore } from '../LegendREPLBaseStore.js';
import { DataCubeCoreState } from './core/DataCubeCoreState.js';
import { validateAndBuildQuerySnapshot } from './core/DataCubeQuerySnapshotBuilder.js';
import { action, makeObservable, observable } from 'mobx';

export class DataCubeTask {
  uuid = uuid();
  name: string;
  startTime = Date.now();
  endTime?: number | undefined;

  constructor(name: string) {
    this.name = name;
  }

  end(): void {
    this.endTime = Date.now();
  }
}

export class DataCubeState {
  readonly replStore: REPLStore;
  readonly application: LegendREPLApplicationStore;
  readonly engine: DataCubeEngine;
  readonly snapshotManager: DataCubeQuerySnapshotManager;

  readonly core: DataCubeCoreState;
  readonly grid: DataCubeGridState;
  readonly editor: DataCubeEditorState;

  readonly runningTaskes = new Map<string, DataCubeTask>();

  constructor(replStore: REPLStore) {
    makeObservable(this, {
      runningTaskes: observable,
      newTask: action,
      endTask: action,
    });

    this.replStore = replStore;
    this.application = replStore.applicationStore;
    this.engine = new DataCubeEngine(this.replStore.client);

    // NOTE: snapshot manager must be instantiated before subscribers
    this.snapshotManager = new DataCubeQuerySnapshotManager(this);
    this.core = new DataCubeCoreState(this);
    this.grid = new DataCubeGridState(this);
    this.editor = new DataCubeEditorState(this);
  }

  newTask(name: string): DataCubeTask {
    const task = new DataCubeTask(name);
    this.runningTaskes.set(task.uuid, task);
    return task;
  }

  endTask(task: DataCubeTask): DataCubeTask {
    task.end();
    this.runningTaskes.delete(task.uuid);
    return task;
  }

  async initialize(): Promise<void> {
    const task = this.newTask('Initializing');
    try {
      await Promise.all(
        [this.core, this.editor, this.grid].map(async (state) => {
          this.snapshotManager.registerSubscriber(state);
          await state.initialize();
        }),
      );
      const result = await this.engine.getBaseQuery();
      const initialSnapshot = validateAndBuildQuerySnapshot(
        result.partialQuery,
        result.sourceQuery,
        result.query,
      );
      initialSnapshot.timestamp = result.timestamp;
      this.snapshotManager.broadcastSnapshot(initialSnapshot);
    } catch (error: unknown) {
      assertErrorThrown(error);
      this.application.notificationService.notifyError(error);
    } finally {
      this.endTask(task);
    }
  }
}
