import React, { useState } from 'react';
import { Checkbox, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PropTypes from 'prop-types';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function MultiSelectAutocomplete (props) {
  const [isFirstTyping, setIsFirstTyping] = useState(true);
  return (
    <Autocomplete
      id={props.id ? props.id : ''}
      limitTags={props.maxElement}
      multiple
      defaultValue={props.defaultValue ? props.defaultValue : [props.items[0]]}
      data-testid="autocomplete-component"
      value={props.value}
      options={props.items}
      getOptionSelected={(option, value) => option.id === value.id}
      groupBy={(option => option.parentId)}
      getOptionDisabled={option => props.recommendationType === "Yearly Wash Optimization" && option.assetType === "Portfolio"}
      disableCloseOnSelect
      getOptionLabel={(option) => option.displayText}
      onChange={props.onChange}
      disabled={props.isReadOnly === true ? true : false}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          <div style={{ flexGrow: 1, display: "flex", justifyContent: "space-between", marginRight: 5 }}>
            <div>
              {option.displayText}
            </div>
            <div style={{ opacity: 0.6 }}>
              {option.assetType}
            </div>
          </div>
        </React.Fragment>
      )}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField
          error={props.value && props.value.length === 0 && !isFirstTyping}
          {...params}
          variant={props.variant}
          label={props.value ? props.value.length === 0 ? "Required. " : props.boxLabelName : props.boxLabelName ? props.boxLabelName : ''}
          placeholder={props.contentLabel}
          onClick={() => setIsFirstTyping(false)}
        />
      )}
    />
  );
}

export default MultiSelectAutocomplete;

/* istanbul ignore next */
MultiSelectAutocomplete.propTypes = {
  id: PropTypes.string.isRequired,
  maxElement: PropTypes.number.isRequired,
  defaultValue: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  recommendationType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  contentLabel: PropTypes.string.isRequired,
  boxLabelName: PropTypes.string.isRequired
};