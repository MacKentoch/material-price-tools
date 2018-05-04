// @flow

// #region imports
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as agenciesActions from '../../redux/modules/agencies';
import * as categoriesActions from '../../redux/modules/categories';
import * as pricesActions from '../../redux/modules/prices';
import Home from './Home';
// #endregion

const mapStateToProps = state => {
  return {
    isLoadingAgencies: state.agencies.isLoading,
    agencies: state.agencies.list,

    isLoadingCategories: state.categories.isLoading,
    categories: state.categories.list,

    isLoadingPrices: state.prices.isLoading,
    prices: state.prices.list,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { ...agenciesActions, ...categoriesActions, ...pricesActions },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
