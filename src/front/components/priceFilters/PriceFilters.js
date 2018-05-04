// @flow

// #region imports
import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import { type Agency } from '../../redux/modules/agencies.types';
import { type Category } from '../../redux/modules/categories.types';
// #endregion

// #region flow types
type Fieldname = 'agency' | 'category';

type Props = {
  // from parent
  isLoadingAgencies: boolean,
  agencies: Array<Agency>,
  onAgencySelect: (agencyId: ?string) => any,

  isLoadingCategories: boolean,
  categories: Array<Category>,
  onCategorySelect: (agencyId: string, categoryId: ?string) => any,

  // jss from withStyles hoc:
  classes: {
    container: string,
    agenciesList: string,
    categoriesList: string,
  },

  ...any,
};

type State = {
  agencyId: string,
  categoryId: string,

  ...any,
};
// #endregion

class PriceFilters extends PureComponent<Props, State> {
  static defaultProps = {
    agencies: [],
    isLoadingAgencies: false,
    onAgencySelect: () => {},

    categories: [],
    isLoadingCategories: false,
    onCategorySelect: () => {},
  };

  state = {
    agencyId: '0',
    categoryId: '0',
  };

  // #region lifecycle
  render() {
    const { classes, agencies, categories } = this.props;
    const { agencyId, categoryId } = this.state;

    return (
      <div className={classes.container}>
        <TextField
          id="select-agency"
          select
          label="Agency"
          className={classes.agenciesList}
          value={agencyId}
          onChange={this.handlesOnChange('agency')}
          helperText="Please select your agency"
          margin="normal"
        >
          {agencies.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="select-category"
          select
          label="Category"
          disabled={!categories || categories.length === 0}
          className={classes.agenciesList}
          value={categoryId}
          onChange={this.handlesOnChange('category')}
          helperText="Please select your category"
          margin="normal"
        >
          {categories.map(({ id }) => (
            <MenuItem key={id} value={id}>
              {id}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
  // #endregion

  // #region textFields onChange events
  handlesOnChange = (fieldName: Fieldname) => (event: SyntheticEvent<>) => {
    if (event) {
      event.preventDefault();
    }
    const id = event.target.value || '0';

    this.setState({ [`${fieldName}Id`]: id });

    if (fieldName === 'agency') {
      const { onAgencySelect } = this.props;
      onAgencySelect(id);
    }

    if (fieldName === 'category') {
      const { onCategorySelect } = this.props;
      const { agencyId } = this.state;
      onCategorySelect(agencyId, id);
    }
  };
  // #endregion
}

export default withStyles(styles)(PriceFilters);
