# @finos/legend-application-studio-bootstrap

## 8.6.0

## 8.5.0

## 8.4.0

## 8.3.0

## 8.2.0

## 8.1.0

## 8.0.0

## 7.22.0

## 7.21.0

## 7.20.0

## 7.19.0

## 7.18.0

## 7.17.0

## 7.16.0

## 7.15.0

## 7.14.0

## 7.13.0

## 7.12.0

## 7.11.0

## 7.10.0

## 7.9.0

## 7.8.0

## 7.7.0

## 7.6.0

## 7.5.0

## 7.4.0

## 7.3.0

## 7.2.0

## 7.1.0

## 7.0.0

### Major Changes

- [#1332](https://github.com/finos/legend-studio/pull/1332) [`5f0c6f6b`](https://github.com/finos/legend-studio/commit/5f0c6f6b40ece8a3b87c32b52f15f542fe68f7d4) ([@akphi](https://github.com/akphi)) - **BREAKING CHANGE:** Renamed package from `@finos/legend-studio-app` to `@finos/legend-application-studio-bootstrap`. Also, methods returning the collection of plugins and presets like `getLegendStudioPresetCollection()` and `getLegendStudioPluginCollection()` are no longer exported, instead, use `LegendStudioWebApplication.getPresetCollection()` and `LegendStudioWebApplication.getPluginCollection()`.