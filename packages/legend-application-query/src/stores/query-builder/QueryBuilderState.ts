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

import { action, flow, observable, makeObservable, computed } from 'mobx';
import {
  type GeneratorFn,
  LogEvent,
  assertErrorThrown,
  guaranteeNonNullable,
  guaranteeType,
  filterByType,
  ActionState,
} from '@finos/legend-shared';
import { QueryBuilderFilterState } from './filter/QueryBuilderFilterState.js';
import { QueryBuilderFetchStructureState } from './fetch-structure/QueryBuilderFetchStructureState.js';
import {
  QueryBuilderTextEditorMode,
  QueryBuilderTextEditorState,
} from './QueryBuilderTextEditorState.js';
import { QueryBuilderExplorerState } from './explorer/QueryBuilderExplorerState.js';
import { QueryBuilderResultState } from './QueryBuilderResultState.js';
import {
  processQueryLambdaFunction,
  processParameters,
} from './QueryBuilderStateBuilder.js';
import { QueryBuilderUnsupportedQueryState } from './QueryBuilderUnsupportedQueryState.js';
import {
  type Class,
  type Mapping,
  type Runtime,
  type GraphManagerState,
  GRAPH_MANAGER_EVENT,
  CompilationError,
  extractSourceInformationCoordinates,
  LambdaFunctionInstanceValue,
  RawLambda,
  VariableExpression,
  observe_ValueSpecification,
  ObserverContext,
  isStubbed_RawLambda,
  buildLambdaVariableExpressions,
  buildRawLambdaFromLambdaFunction,
} from '@finos/legend-graph';
import { buildLambdaFunction } from './QueryBuilderValueSpecificationBuilder.js';
import type { GenericLegendApplicationStore } from '@finos/legend-application';
import { QueryFunctionsExplorerState } from './explorer/QueryFunctionsExplorerState.js';
import { QueryBuilderParametersState } from './QueryBuilderParametersState.js';
import type { QueryBuilderFilterOperator } from './filter/QueryBuilderFilterOperator.js';
import { getQueryBuilderCoreFilterOperators } from './filter/QueryBuilderFilterOperatorLoader.js';
import { QueryBuilderChangeDetectionState } from './QueryBuilderChangeDetectionState.js';
import { QueryBuilderMilestoningState } from './QueryBuilderMilestoningState.js';

export abstract class QueryBuilderState {
  applicationStore: GenericLegendApplicationStore;
  graphManagerState: GraphManagerState;

  changeDetectionState: QueryBuilderChangeDetectionState;
  explorerState: QueryBuilderExplorerState;
  functionsExplorerState: QueryFunctionsExplorerState;
  parametersState: QueryBuilderParametersState;
  milestoningState: QueryBuilderMilestoningState;
  fetchStructureState: QueryBuilderFetchStructureState;
  filterState: QueryBuilderFilterState;
  filterOperators: QueryBuilderFilterOperator[] =
    getQueryBuilderCoreFilterOperators();
  resultState: QueryBuilderResultState;
  textEditorState: QueryBuilderTextEditorState;
  unsupportedQueryState: QueryBuilderUnsupportedQueryState;
  observableContext: ObserverContext;

  queryCompileState = ActionState.create();
  backdrop = false;
  showFunctionsExplorerPanel = false;
  showParametersPanel = false;

  class?: Class | undefined;
  mapping?: Mapping | undefined;
  runtimeValue?: Runtime | undefined;

  // NOTE: this makes it so that we need to import components in stores code,
  // we probably want to refactor to an extension mechanism
  TEMPORARY__setupPanelContentRenderer?: (() => React.ReactNode) | undefined;

  constructor(
    applicationStore: GenericLegendApplicationStore,
    graphManagerState: GraphManagerState,
  ) {
    makeObservable(this, {
      explorerState: observable,
      parametersState: observable,
      functionsExplorerState: observable,
      fetchStructureState: observable,
      filterState: observable,
      resultState: observable,
      textEditorState: observable,
      unsupportedQueryState: observable,
      backdrop: observable,
      showFunctionsExplorerPanel: observable,
      showParametersPanel: observable,
      changeDetectionState: observable,
      class: observable,
      mapping: observable,
      runtimeValue: observable,

      sideBarClassName: computed,
      isQuerySupported: computed,
      validationIssues: computed,

      setBackdrop: action,
      setShowFunctionsExplorerPanel: action,
      setShowParametersPanel: action,
      setClass: action,
      setMapping: action,
      setRuntimeValue: action,

      resetQueryResult: action,
      resetQueryContent: action,
      changeClass: action,
      changeMapping: action,

      rebuildWithQuery: action,
      saveQuery: action,
      compileQuery: flow,
    });

    this.applicationStore = applicationStore;
    this.graphManagerState = graphManagerState;

    this.milestoningState = new QueryBuilderMilestoningState(this);
    this.explorerState = new QueryBuilderExplorerState(this);
    this.parametersState = new QueryBuilderParametersState(this);
    this.functionsExplorerState = new QueryFunctionsExplorerState(this);
    this.fetchStructureState = new QueryBuilderFetchStructureState(this);
    this.filterState = new QueryBuilderFilterState(this, this.filterOperators);
    this.resultState = new QueryBuilderResultState(this);
    this.textEditorState = new QueryBuilderTextEditorState(this);
    this.unsupportedQueryState = new QueryBuilderUnsupportedQueryState(this);
    this.observableContext = new ObserverContext(
      this.graphManagerState.pluginManager.getPureGraphManagerPlugins(),
    );
    this.changeDetectionState = new QueryBuilderChangeDetectionState(this);
  }

  get isMappingReadOnly(): boolean {
    return false;
  }

  get isRuntimeReadOnly(): boolean {
    return false;
  }

  get sideBarClassName(): string | undefined {
    return undefined;
  }

  get isParameterSupportDisabled(): boolean {
    return false;
  }

  get isResultPanelHidden(): boolean {
    return false;
  }

  /**
   * This flag is for turning on/off DnD support from projection panel to filter panel,
   * and will be leveraged when the concepts of workflows are introduced into query builder.
   */
  get TEMPORARY__isDnDFetchStructureToFilterSupported(): boolean {
    return true;
  }

  setBackdrop(val: boolean): void {
    this.backdrop = val;
  }

  setShowFunctionsExplorerPanel(val: boolean): void {
    this.showFunctionsExplorerPanel = val;
  }

  setShowParametersPanel(val: boolean): void {
    this.showParametersPanel = val;
  }

  setClass(val: Class | undefined): void {
    this.class = val;
  }

  setMapping(val: Mapping | undefined): void {
    this.mapping = val;
  }

  setRuntimeValue(val: Runtime | undefined): void {
    this.runtimeValue = val;
  }

  get isQuerySupported(): boolean {
    return !this.unsupportedQueryState.rawLambda;
  }

  resetQueryResult(): void {
    const resultState = new QueryBuilderResultState(this);
    resultState.setPreviewLimit(this.resultState.previewLimit);
    this.resultState = resultState;
  }

  resetQueryContent(): void {
    this.textEditorState = new QueryBuilderTextEditorState(this);
    this.unsupportedQueryState = new QueryBuilderUnsupportedQueryState(this);
    this.milestoningState = new QueryBuilderMilestoningState(this);
    this.explorerState = new QueryBuilderExplorerState(this);
    this.explorerState.refreshTreeData();
    this.parametersState = new QueryBuilderParametersState(this);
    this.functionsExplorerState = new QueryFunctionsExplorerState(this);
    this.filterState = new QueryBuilderFilterState(this, this.filterOperators);
    const currentFetchStructureImplementationType =
      this.fetchStructureState.implementation.type;
    this.fetchStructureState = new QueryBuilderFetchStructureState(this);
    if (
      currentFetchStructureImplementationType !==
      this.fetchStructureState.implementation.type
    ) {
      this.fetchStructureState.changeImplementation(
        currentFetchStructureImplementationType,
      );
    }
  }

  changeClass(val: Class): void {
    this.resetQueryResult();
    this.resetQueryContent();
    this.setClass(val);
    this.explorerState.refreshTreeData();
    this.milestoningState.updateMilestoningConfiguration();
    this.fetchStructureState.implementation.onClassChange(val);
  }

  changeMapping(val: Mapping): void {
    this.resetQueryResult();
    this.resetQueryContent();
    this.setMapping(val);
  }

  changeRuntime(val: Runtime): void {
    this.resetQueryResult();
    this.setRuntimeValue(val);
  }

  buildQuery(options?: { keepSourceInformation: boolean }): RawLambda {
    if (!this.isQuerySupported) {
      const parameters = this.parametersState.parameterStates.map((e) =>
        this.graphManagerState.graphManager.serializeValueSpecification(
          e.parameter,
        ),
      );
      this.unsupportedQueryState.setRawLambda(
        new RawLambda(parameters, this.unsupportedQueryState.rawLambda?.body),
      );
      return guaranteeNonNullable(this.unsupportedQueryState.rawLambda);
    }
    return buildRawLambdaFromLambdaFunction(
      buildLambdaFunction(this, {
        keepSourceInformation: Boolean(options?.keepSourceInformation),
      }),
      this.graphManagerState,
    );
  }

  initializeWithQuery(rawLambda: RawLambda): void {
    try {
      this.rebuildWithQuery(rawLambda);
      if (this.parametersState.parameterStates.length > 0) {
        this.setShowParametersPanel(true);
      }
    } catch (error) {
      assertErrorThrown(error);
      this.resetQueryContent();
      this.resetQueryResult();
      this.unsupportedQueryState.setLambdaError(error);
      this.unsupportedQueryState.setRawLambda(rawLambda);
      this.setClass(undefined);
      const parameters = buildLambdaVariableExpressions(
        rawLambda,
        this.graphManagerState,
      )
        .map((param) =>
          observe_ValueSpecification(param, this.observableContext),
        )
        .filter(filterByType(VariableExpression));
      processParameters(parameters, this);
    }
  }

  /**
   * Process the provided query, and rebuild the query builder state.
   *
   * @throws error if there is an issue building the compiled lambda or rebuilding the state.
   * consumers of function should handle the errors.
   */
  rebuildWithQuery(val: RawLambda): void {
    this.resetQueryResult();
    this.resetQueryContent();
    if (!isStubbed_RawLambda(val)) {
      const valueSpec = observe_ValueSpecification(
        this.graphManagerState.graphManager.buildValueSpecification(
          this.graphManagerState.graphManager.serializeRawValueSpecification(
            val,
          ),
          this.graphManagerState.graph,
        ),
        this.observableContext,
      );
      const compiledValueSpecification = guaranteeType(
        valueSpec,
        LambdaFunctionInstanceValue,
        `Can't build query state: query builder only support lambda`,
      );
      processQueryLambdaFunction(
        guaranteeNonNullable(compiledValueSpecification.values[0]),
        this,
      );
    }
  }

  async saveQuery(
    onSaveQuery: (lambda: RawLambda) => Promise<void>,
  ): Promise<void> {
    try {
      const rawLambda = this.buildQuery();
      await onSaveQuery(rawLambda);
    } catch (error) {
      assertErrorThrown(error);
      this.applicationStore.notifyError(`Can't save query: ${error.message}`);
    }
  }

  *compileQuery(): GeneratorFn<void> {
    if (!this.textEditorState.mode) {
      this.queryCompileState.inProgress();
      this.fetchStructureState.implementation.clearCompilationError();
      // form mode
      try {
        this.textEditorState.setCompilationError(undefined);
        // NOTE: retain the source information on the lambda in order to be able
        // to pin-point compilation issue in form mode
        (yield this.graphManagerState.graphManager.getLambdaReturnType(
          this.buildQuery({ keepSourceInformation: true }),
          this.graphManagerState.graph,
          { keepSourceInformation: true },
        )) as string;
        this.applicationStore.notifySuccess('Compiled successfully');
      } catch (error) {
        assertErrorThrown(error);
        this.applicationStore.log.error(
          LogEvent.create(GRAPH_MANAGER_EVENT.COMPILATION_FAILURE),
          error,
        );
        let fallbackToTextModeForDebugging = true;
        // if compilation failed, we try to reveal the error in form mode,
        // if even this fail, we will fall back to show it in text mode
        if (error instanceof CompilationError && error.sourceInformation) {
          fallbackToTextModeForDebugging =
            !this.fetchStructureState.implementation.revealCompilationError(
              error,
            );
        }

        // decide if we need to fall back to text mode for debugging
        if (fallbackToTextModeForDebugging) {
          this.applicationStore.notifyWarning(
            'Compilation failed and error cannot be located in form mode. Redirected to text mode for debugging.',
          );
          this.textEditorState.openModal(QueryBuilderTextEditorMode.TEXT);
          // TODO: trigger another compilation to pin-point the issue
          // since we're using the lambda editor right now, we are a little bit limitted
          // in terms of the timing to do compilation (since we're using an `useEffect` to
          // convert the lambda to grammar text), we might as well wait for the refactor
          // of query builder text-mode
          // See https://github.com/finos/legend-studio/issues/319
        } else {
          this.applicationStore.notifyWarning(
            `Compilation failed: ${error.message}`,
          );
        }
      } finally {
        this.queryCompileState.complete();
      }
    } else if (this.textEditorState.mode === QueryBuilderTextEditorMode.TEXT) {
      this.queryCompileState.inProgress();
      try {
        this.textEditorState.setCompilationError(undefined);
        (yield this.graphManagerState.graphManager.getLambdaReturnType(
          this.textEditorState.rawLambdaState.lambda,
          this.graphManagerState.graph,
          { keepSourceInformation: true },
        )) as string;
        this.applicationStore.notifySuccess('Compiled successfully');
      } catch (error) {
        assertErrorThrown(error);
        if (error instanceof CompilationError) {
          this.applicationStore.log.error(
            LogEvent.create(GRAPH_MANAGER_EVENT.COMPILATION_FAILURE),
            error,
          );
          this.applicationStore.notifyWarning(
            `Compilation failed: ${error.message}`,
          );
          const errorElementCoordinates = extractSourceInformationCoordinates(
            error.sourceInformation,
          );
          if (errorElementCoordinates) {
            this.textEditorState.setCompilationError(error);
          }
        }
      } finally {
        this.queryCompileState.complete();
      }
    }
  }

  get validationIssues(): string[] | undefined {
    return this.fetchStructureState.implementation.validationIssues;
  }

  /**
   * This method can be used to simplify the current query builder state
   * to a basic one that can be used for testing or some special operations,
   * see {@link INTERNAL__BasicQueryBuilderState} for more details
   */
  INTERNAL__toBasicQueryBuilderState(): QueryBuilderState {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const basicState = new INTERNAL__BasicQueryBuilderState(
      this.applicationStore,
      this.graphManagerState,
    );
    basicState.class = this.class;
    basicState.mapping = this.mapping;
    basicState.runtimeValue = this.runtimeValue;
    return basicState;
  }
}

/**
 * This type is used for testing and analytics operation in query builder.
 * For example, we use this to build the preview data lambda, or to build the auto-complete lambda
 * in filters.
 *
 * NOTE: The latter is quite clever since query-builder itself is used to build the lambda (i.e. dogfooding),
 * unfortunately, it creates a circular dependency between QueryBuilderState and PreviewData/AutoComplete
 *
 * @internal
 */
export class INTERNAL__BasicQueryBuilderState extends QueryBuilderState {}
