// @flow

// #region imports
import React, { PureComponent } from 'react';
import Switch from 'material-ui/Switch';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
// #endregion

// #region flow types
type Props = {
  // from parent
  defaultValidated: boolean,
  onToggle: (isValidated: boolean) => any,

  // jss from withStyles hoc:
  classes: {
    container: string,
  },

  ...any,
};

type State = {
  isChecked: boolean,

  ...any,
};
// #endregion

class ValidatedToggle extends PureComponent<Props, State> {
  static defaultProps = {
    defaultValidated: false,
  };

  state = {
    isChecked: false,
  };

  // #region lifecycle
  componentDidMount() {
    const { defaultValidated } = this.props;
    this.setState({ isChecked: defaultValidated });
  }

  render() {
    const { classes } = this.props;
    const { isChecked } = this.state;

    return (
      <div className={classes.container}>
        <Switch
          checked={isChecked}
          value="checked"
          onChange={this.handlesOnToggle}
          color="primary"
        />
      </div>
    );
  }
  // #endregion

  // #region toggle event
  handlesOnToggle = (event: SyntheticEvent<>, checked: boolean) => {
    this.setState({ isChecked: checked });

    const { onToggle } = this.props;
    onToggle(checked);
  };
  // #endregion
}

export default withStyles(styles)(ValidatedToggle);
