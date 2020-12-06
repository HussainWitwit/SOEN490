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
      value={props.value}
      options={props.items}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
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
          {option.title}
        </React.Fragment>
      )}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={props.variant}
          label={props.boxLabelName}
          placeholder={props.contentLabel}
        />
      )}
    />
  );
}
export default MultiSelectAutocomplete;
