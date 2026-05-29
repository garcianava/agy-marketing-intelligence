/**
 * Extracts a specific event parameter value from the GA4 event_params repeated record.
 * Generates the clean scalar subquery to fetch string, integer, float, or double values.
 * 
 * @param {string} keyName The name of the event parameter (e.g. 'page_title', 'ga_session_id').
 * @param {string} valueType The type of value to retrieve: 'string', 'int', 'float', or 'double'. Defaults to 'string'.
 * @returns {string} The BigQuery SQL subquery string.
 */
function getEventParam(keyName, valueType = 'string') {
  const typeColumn = {
    string: 'string_value',
    int: 'int_value',
    float: 'float_value',
    double: 'double_value'
  }[valueType] || 'string_value';

  return `(SELECT value.${typeColumn} FROM UNNEST(event_params) WHERE key = '${keyName}')`;
}

module.exports = {
  getEventParam
};
