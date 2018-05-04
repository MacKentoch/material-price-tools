// @flow

// #region imports
import React, { PureComponent } from 'react';
import { type Match, type Location, type RouterHistory } from 'react-router';
import cx from 'classnames';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card';
import styles from './styles';
import PriceFilters from '../../components/priceFilters';
import {
  type Agency,
  type GetAllAgenciesIfNeeded,
} from '../../redux/modules/agencies.types';
import {
  type Category,
  type GetAllCategoriesIfNeeded,
} from '../../redux/modules/categories.types';
import {
  type Price,
  type GetAllPricesIfNeeded,
} from '../../redux/modules/prices.types';
import ValidatedToggle from '../../components/validatedToggle';
import PriceTable from '../../components/priceTable';
// #endregion

// #region flow types
type Props = {
  // react-router 4:
  match: Match,
  location: Location,
  history: RouterHistory,

  // redux state:
  isLoadingAgencies: boolean,
  agencies: Array<Agency>,
  getAllAgenciesIfNeeded: GetAllAgenciesIfNeeded,
  isLoadingCategories: boolean,
  categories: Array<Category>,
  getAllCategoriesIfNeeded: GetAllCategoriesIfNeeded,
  isLoadingPrices: boolean,
  prices: Array<Price>,
  getAllPricesIfNeeded: GetAllPricesIfNeeded,

  // jss from withStyles hoc:
  classes: {
    flexible: string,
    pageContainer: string,
    card: string,
  },

  ...any,
};

type State = {
  animated: boolean,
  filterIsValidated: boolean,

  ...any,
};
// #endregion

class Home extends PureComponent<Props, State> {
  static defaultProps = {
    isLoadingAgencies: false,
    agencies: [],
    isLoadingCategories: false,
    categories: [],
    isLoadingPrices: false,
    prices: [],
  };

  state = {
    animated: true,
    filterIsValidated: false,
  };

  // #region lifecyle
  async componentDidMount() {
    const { getAllAgenciesIfNeeded } = this.props;
    await getAllAgenciesIfNeeded();
  }

  render() {
    const {
      classes,
      isLoadingAgencies,
      agencies,
      isLoadingCategories,
      categories,
      isLoadingPrices,
      prices,
    } = this.props;

    const { animated, filterIsValidated } = this.state;

    const priceFilterProps = {
      isLoadingAgencies,
      agencies,
      isLoadingCategories,
      categories,
      onAgencySelect: this.handlesOnAgencySelection,
      onCategorySelect: this.handlesOnCategorySelection,
    };

    const visiblePrices = !filterIsValidated
      ? [...prices]
      : prices.filter(({ isValidated }) => isValidated);

    return (
      <section
        className={cx(classes.pageContainer, classes.flexible, {
          fadeIn: animated,
        })}
      >
        <Grid container justify="center" spacing={24}>
          <Grid item xs={12} sm={12} md={8}>
            <Card>
              <CardHeader title="Price search" />
              <CardContent>
                <PriceFilters {...priceFilterProps} />
                <div className={classes.tableContainer}>
                  <PriceTable
                    isLoadingPrices={isLoadingPrices}
                    prices={visiblePrices}
                  />
                </div>
              </CardContent>
              <CardActions>
                {Array.isArray(prices) && prices.length > 0 ? (
                  <ValidatedToggle
                    defaultValidated={false}
                    onToggle={this.handlesOnValidatedToggle}
                  />
                ) : null}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </section>
    );
  }
  // #endregion

  // #region on agency selection
  handlesOnAgencySelection = async (agencyId: string) => {
    if (agencyId) {
      const { getAllCategoriesIfNeeded } = this.props;
      await getAllCategoriesIfNeeded(agencyId);
    }
  };
  // #endregion

  // #region on agency selection
  handlesOnCategorySelection = async (agencyId: string, categoryId: string) => {
    if (agencyId && categoryId) {
      const { getAllPricesIfNeeded } = this.props;
      await getAllPricesIfNeeded(agencyId, categoryId);
    }
  };
  // #endregion

  // #region on is validated toggle
  handlesOnValidatedToggle = (filterIsValidated: boolean) => {
    this.setState({ filterIsValidated });
  };
  // #endregion
}

export default withStyles(styles)(Home);
