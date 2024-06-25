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

import { observer } from 'mobx-react-lite';
import { DataCubeIcon } from '@finos/legend-art';
import { type DataCubeQuerySnapshotColumn } from '../../../stores/dataCube/core/DataCubeQuerySnapshot.js';
import type {
  ColDef,
  GetRowIdParams,
  GridApi,
  RowDragEndEvent,
} from '@ag-grid-community/core';
import { useCallback, useEffect, useState } from 'react';
import {
  AgGridReact,
  type CustomCellRendererProps,
} from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import type {
  DataCubeEditorColumnsSelectorColumnState,
  DataCubeEditorColumnsSelectorState,
} from '../../../stores/dataCube/editor/DataCubeEditorColumnsSelectorState.js';
import { isNonNullable } from '@finos/legend-shared';

const leftColumns: ColDef[] = [
  {
    colId: 'checkbox',
    // maxWidth: 35,
    // width: 35,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    rowDrag: true,
    rowDragText: (params, dragItemCount) => {
      if (dragItemCount > 1) {
        return `${dragItemCount} columns`;
      }
      return params.rowNode!.data.name;
    },
    field: 'name',
    headerComponent: (params: CustomCellRendererProps) => (
      <div className="pl-0.5">{`[All Columns]`}</div>
    ),
    cellRenderer: (params: CustomCellRendererProps) => (
      <div className="pl-2">{params.value}</div>
    ),
  },
];

const rightColumns: ColDef[] = [
  {
    rowDrag: true,
    maxWidth: 25,
    width: 25,
    suppressHeaderMenuButton: true,
    rowDragText: (params, dragItemCount) => {
      if (dragItemCount > 1) {
        return `${dragItemCount} columns`;
      }
      return params.rowNode!.data.name;
    },
  },
  {
    colId: 'checkbox',
    maxWidth: 25,
    width: 25,
    checkboxSelection: true,
    suppressHeaderMenuButton: true,
    headerCheckboxSelection: true,
  },
  {
    field: 'name',
    headerName: '',
  },
  // {
  //   suppressHeaderMenuButton: true,
  //   maxWidth: 50,
  //   cellRenderer: SportRenderer,
  // },
];
// const SportRenderer = (props: CustomCellRendererProps) => {
//   return (
//     <i
//       className="far fa-trash-alt"
//       style={{ cursor: 'pointer' }}
//       onClick={() => props.api.applyTransaction({ remove: [props.node.data] })}
//     ></i>
//   );
// };

const defaultColDef: ColDef = {
  flex: 1,
  minWidth: 100,
  filter: true,
  sortable: false,
  resizable: false,
  suppressHeaderMenuButton: true,
};

function getRowId<T extends DataCubeQuerySnapshotColumn>(
  params: GetRowIdParams<T>,
) {
  return params.data.name;
}

export const DataCubeEditorColumnsSelector = observer(
  function DataCubeEditorColumnsSelector<
    T extends DataCubeEditorColumnsSelectorColumnState,
  >(props: { selector: DataCubeEditorColumnsSelectorState<T> }) {
    const { selector } = props;
    const [availableColumnsGridApi, setAvailableColumnsGridApi] =
      useState<GridApi | null>(null);
    const [selectedColumnsGridApi, setSelectedColumnsGridApi] =
      useState<GridApi | null>(null);

    const onSelectedColumnsDragStop = useCallback(
      (params: RowDragEndEvent<T>) => {
        const nodes = params.nodes;

        selector.setSelectedColumns([
          ...selector.selectedColumns,
          ...nodes.map((node) => node.data).filter(isNonNullable),
        ]);
        console.log(params);

        // if (radioChecked === 0) {
        //   setAvailableColumnsGridApi!.applyTransaction({
        //     remove: nodes.map((node) => {
        //       return node.data;
        //     }),
        //   });
        // } else if (radioChecked === 1) {
        //   setAvailableColumnsGridApi!.setNodesSelected({
        //     nodes,
        //     newValue: false,
        //   });
        // }
        console.log(nodes);
      },
      [setAvailableColumnsGridApi],
    );

    useEffect(() => {
      if (!availableColumnsGridApi || !selectedColumnsGridApi) {
        return;
      }
      const selectedDropZoneParams =
        selectedColumnsGridApi.getRowDropZoneParams({
          onDragStop: onSelectedColumnsDragStop,
        });

      availableColumnsGridApi.removeRowDropZone(selectedDropZoneParams);
      availableColumnsGridApi.addRowDropZone(selectedDropZoneParams);
    }, [
      availableColumnsGridApi,
      selectedColumnsGridApi,
      onSelectedColumnsDragStop,
    ]);

    return (
      <div className="flex h-full w-full">
        <div className="h-full w-[calc(50%_-_20px)]">
          <div className="flex h-5 items-center text-sm">
            Available columns:
          </div>
          <div className="h-[calc(100%_-_20px)] rounded-sm border border-neutral-200">
            <div className="relative h-6 border-b border-neutral-200">
              <input
                className="h-full w-full pl-9"
                placeholder="Click here to search..."
              />
              <div className="absolute left-0 top-0 flex h-6 w-9 items-center justify-center">
                <DataCubeIcon.Search className="stroke-[3px] text-lg text-neutral-500" />
              </div>
            </div>
            <div className="h-[calc(100%_-_24px)]">
              <AgGridReact
                modules={[ClientSideRowModelModule]}
                className="ag-theme-balham"
                animateRows={false}
                defaultColDef={defaultColDef}
                getRowId={getRowId}
                rowDragManaged={false}
                editType="fullRow"
                rowSelection="multiple"
                rowDragMultiRow={true}
                rowDragEntireRow={true}
                suppressRowClickSelection={false}
                suppressMoveWhenRowDragging={true}
                rowData={selector.availableColumns}
                rowHeight={20}
                headerHeight={20}
                columnDefs={leftColumns}
                onGridReady={(params) => setAvailableColumnsGridApi(params.api)}
                onRowDragEnter={(event) => {
                  console.log('enter', event);
                }}
                onRowDragLeave={(event) => {
                  console.log('leave', event);
                }}
                onRowDragMove={(event) => {
                  console.log('move', event);
                }}
                onRowDragEnd={(event) => {
                  console.log('end', event);
                }}
                suppressRowHoverHighlight={false}
              />
            </div>
          </div>
        </div>
        <div className="flex h-full w-10 items-center justify-center">
          <div className="flex flex-col">
            <button className="flex items-center justify-center rounded-sm border border-neutral-300 bg-neutral-100 hover:bg-neutral-200">
              <DataCubeIcon.ChevronRight className="text-2xl text-neutral-500 hover:text-neutral-600" />
            </button>
            <button className="mt-2 flex items-center justify-center rounded-sm border border-neutral-300 bg-neutral-100 hover:bg-neutral-200">
              <DataCubeIcon.ChevronLeft className="text-2xl text-neutral-500 hover:text-neutral-600" />
            </button>
          </div>
        </div>
        <div className="h-full w-[calc(50%_-_20px)]">
          <div className="flex h-5 items-center text-sm">Selected columns:</div>
          <div className="h-[calc(100%_-_20px)] rounded-sm border border-neutral-200">
            <div className="relative h-6 border-b border-neutral-200">
              <input
                className="h-full w-full pl-7"
                placeholder="Click here to search..."
              />
              <div className="absolute left-1 top-0 flex h-6 w-6 items-center justify-center">
                <DataCubeIcon.Search className="stroke-[3px] text-lg text-neutral-500" />
              </div>
            </div>
            <div className="h-[calc(100%_-_24px)]">
              <AgGridReact
                modules={[ClientSideRowModelModule]}
                rowHeight={20}
                headerHeight={20}
                className="ag-theme-balham"
                animateRows={false}
                defaultColDef={defaultColDef}
                getRowId={getRowId}
                rowDragManaged={false}
                rowSelection="multiple"
                rowDragMultiRow={true}
                rowDragEntireRow={true}
                suppressRowClickSelection={false}
                suppressMoveWhenRowDragging={false}
                rowData={selector.selectedColumns}
                columnDefs={rightColumns}
                onGridReady={(params) => setSelectedColumnsGridApi(params.api)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
