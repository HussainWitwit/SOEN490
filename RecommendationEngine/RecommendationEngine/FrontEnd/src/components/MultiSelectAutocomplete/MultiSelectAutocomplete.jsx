import React from 'react';
import { Checkbox, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function MultiSelectAutocomplete(props) {
  return (
    <Autocomplete
      id="multiple-select-asset-container"
      limitTags={props.maxElement}
      multiple //TODO: Add case that checks the recommendation type and disabled multiple selection
      defaultValue={props.defaultValue ? props.defaultValue : [props.items[0]]}
      data-testid="autocomplete-component"
      value={props.value}
      options={props.items}
      groupBy = {(option => option.assetType)}
      getOptionDisabled = {option => props.recommendationType === "Yearly Wash Optimization" && option.assetType === "Portfolio"}
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
          <div style = {{flexGrow: 1, display: "flex", justifyContent: "space-between", marginRight: 5}}>
            <div>
                {option.displayText}
            </div>
            <div style = {{opacity: 0.6}}>
                {option.assetType}
            </div>
          </div>
        </React.Fragment>
      )}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField
          error = {props.value && props.value.length === 0} 
          {...params}
          variant={props.variant}
          label={props.value ? props.value.length === 0 ? "Required. ": props.boxLabelName : props.boxLabelName ? props.boxLabelName : ''}
          placeholder={props.contentLabel}
        />
      )}
    />
  );
}
export default MultiSelectAutocomplete;
