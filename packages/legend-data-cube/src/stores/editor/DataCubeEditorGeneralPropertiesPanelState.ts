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

import { action, makeObservable, observable } from 'mobx';
import type { DataCubeViewState } from '../DataCubeViewState.js';
import { type DataCubeQuerySnapshot } from '../core/DataCubeQuerySnapshot.js';
import type { DataCubeQueryEditorPanelState } from './DataCubeEditorPanelState.js';
import type { DataCubeEditorState } from './DataCubeEditorState.js';
import { DataCubeEditorMutableConfiguration } from './DataCubeEditorMutableConfiguration.js';
import type { DataCubeConfiguration } from '../core/DataCubeConfiguration.js';

export class DataCubeEditorGeneralPropertiesPanelState
  implements DataCubeQueryEditorPanelState
{
  readonly view!: DataCubeViewState;
  readonly editor!: DataCubeEditorState;

  name = '';
  limit = -1;
  configuration = new DataCubeEditorMutableConfiguration();

  constructor(editor: DataCubeEditorState) {
    makeObservable(this, {
      configuration: observable,

      name: observable,
      setName: action,

      limit: observable,
      setLimit: action,

      applySnaphot: action,
    });

    this.editor = editor;
    this.view = editor.view;
  }

  setName(val: string) {
    this.name = val;
  }

  setLimit(val: number) {
    this.limit = val;
  }

  applySnaphot(
    snapshot: DataCubeQuerySnapshot,
    configuration: DataCubeConfiguration,
  ) {
    this.setName(snapshot.data.name);
    this.setLimit(
      snapshot.data.limit !== undefined && snapshot.data.limit >= 0
        ? snapshot.data.limit
        : -1,
    );
    this.configuration = DataCubeEditorMutableConfiguration.create(
      snapshot.data.configuration,
    );
  }

  buildSnapshot(
    newSnapshot: DataCubeQuerySnapshot,
    baseSnapshot: DataCubeQuerySnapshot,
  ) {
    const data = newSnapshot.data;
    data.name = this.name;
    data.limit = this.limit < 0 ? undefined : this.limit;
    data.configuration = this.configuration.serialize();
  }
}