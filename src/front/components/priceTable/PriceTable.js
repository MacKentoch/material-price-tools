// @flow

// #region imports
import React, { PureComponent } from 'react';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import format from 'date-fns/format';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import SearchIcon from '@material-ui/icons/Search';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import styles from './styles';
import { type Price } from '../../redux/modules/prices.types';
import appConfig from '../../config/appConfig';
// #endregion

// #region flow types
type Props = {
  // from parent
  isLoadingPrices: boolean,
  prices: Array<Price>,

  // jss from withStyles hoc:
  classes: {
    table: string,
    priceRowContainer: string,
    dateContainer: string,
    priceContainer: string,
    suggestedPriceContainer: string,
  },

  ...any,
};

type State = any;
// #endregion

// #region constants
const { dateFormat } = appConfig;
// #endregion

class PriceTable extends PureComponent<Props, State> {
  static defaultProps = {
    isLoadingPrices: false,
    prices: [],
  };

  // #region lifecycle
  render() {
    const { prices, classes } = this.props;

    return (
      <div>
        {prices.length === 0 ? (
          <span className={classes.noPricesContainer}>
            <SearchIcon className={classes.searchIcon} />
            <Typography variant="caption" gutterBottom>
              Adjust agency and category to find prices
            </Typography>
          </span>
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell variant="head">
                  <span>Date</span>
                </TableCell>
                <TableCell variant="head">
                  <span>Price</span>
                </TableCell>
                <TableCell variant="head">
                  <span>validated?</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prices.map(
                ({ id, price, suggestedPrice, isValidated, startDate }) => {
                  return (
                    <TableRow key={`price-${id}`}>
                      <TableCell>
                        <div className={classes.dateContainer}>
                          <DateRangeIcon />
                          <span>{`date: ${format(
                            startDate,
                            dateFormat,
                          )}`}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={classes.priceRowContainer}>
                          <div className={classes.priceContainer}>
                            <EuroSymbolIcon />
                            <span>{`price: ${price}`}</span>
                          </div>
                          <div className={classes.suggestedPriceContainer}>
                            <LightbulbOutlineIcon />
                            <span>{`suggested price: ${suggestedPrice}`}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {isValidated ? <CheckCircleIcon /> : <CancelIcon />}
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
        )}
      </div>
    );
  }
  // #endregion
}

export default withStyles(styles)(PriceTable);
