/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import * as React from 'react';

import { teal700, teal500, amber500, teal100 } from 'material-ui/styles/colors';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { AppBar, Chip, RaisedButton, TextField } from 'material-ui';
import ActionAccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet'

const INITIAL_BUDGET = 0;
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal500,
    primary2Color: teal700,
    primary3Color: teal100,
    accent1Color: amber500,
  }
});

let APP_STATE_LOCALSTORAGE = "app_state";


interface State {
  budget: number;
}

class Main extends React.Component<{}, State> {
  constructor() {
    super();
    this.state = {
      budget: INITIAL_BUDGET
    }
  }

  refs: {
    outcome: HTMLInputElement;
    income: HTMLInputElement;
  }

  componentDidUpdate(provProps: {}, prevState: State) {
    // SEND REMOTE STATE UPDATE
    window.localStorage.setItem(APP_STATE_LOCALSTORAGE, JSON.stringify(this.state));
  }

  componentDidMount() {
    // GET REMOTE STATE
    console.log("Mounted :)");
    try {
      let newState: State | null = JSON.parse(window.localStorage.getItem(APP_STATE_LOCALSTORAGE));
      if (newState) {
        this.setState(newState);
      }
    } catch (error) {
      return;
    }
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    let outcome = ((this.refs.outcome as any).input.value);
    let income = ((this.refs.income as any).input.value);

    if (outcome || income) {
      outcome = outcome || 0;
      income = income || 0;

      this.setState({
        budget: this.state.budget + parseFloat(income) - parseFloat(outcome)
      });
      (this.refs.income as any).input.value = "";
      (this.refs.outcome as any).input.value = "";
    }

    e.preventDefault();
  }



  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            style={{ margin: 0 }}
            title="Andrea's utils"
            >
          </AppBar>
          <div style={{ margin: "1em" }}>
            <h1>Soldi</h1>
            <h2><ActionAccountBalanceWallet style={{marginRight: "6px"}}/>Portafoglio: {this.state.budget.toFixed(2)}{"€"}</h2>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <TextField ref="outcome" floatingLabelText="Soldi spesi" type="number" step="0.01"></TextField>
              <br />
              <TextField ref="income" floatingLabelText="Soldi guadagnati" type="number" step="0.01"></TextField>
              <br />
              <RaisedButton label="Inserisci" secondary={true} type="submit"></RaisedButton>
            </form>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
