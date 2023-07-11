# grafana-select-plugin
- Plugin sample for showing data by selected date from DB
- With a mission to save ouputs of Logs or executable scripts by Time Series Database and show these data.
- Grafana's default TEXT visualization doesn't support this and also seems like it doesn't want to be overridden.
- Using Queries wrote on Visualiztion, Grafana will return the specific data.
- By this way, this Plugin get the time range, show date options with Select, and handle the DB data.
- Based on:
  - Grafana 9.5.2

### Steps

- **Step 0**: Clone this plugin project into your path to grafana plugins
  - Usually on `/path/to/grafana/data/plugins`
- **Step 1**: Install necessary node_modules and build
  ```bash
  yarn install
  yarn add luxon
  yarn dev
  ```
  - Without Errors, you can restart Grafana server, so the plugin will be loaded. 
- **Step 2**: Check it on your Browser
  - Add a new Visualization of Select Plugin
  - Choose your Data soure
  - Write your own Query. With InfluxDB as the Data source, mine looks like this
  ```
  from(bucket: "xxk_bucket")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "xkmeasurement")
  |> filter(fn: (r) => r["_field"] == "details" or r["_field"] == "lockedInfo" or r["_field"] == "blockInfo")
  |> yield(name: "mean")
  ```
