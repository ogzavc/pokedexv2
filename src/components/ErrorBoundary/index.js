"use client";
import React from "react";
import { connect } from "react-redux";
import { Snackbar, Alert } from "@/components";
import {
  selectPokemonListError,
  selectPokemonsByTypeError,
  selectPokemonDetailsError,
  selectPokemonsError,
} from "@/lib/features";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, open: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error, open: true };
  }

  componentDidUpdate(prevProps) {
    if (this.props.error && this.props.error?.id !== prevProps.error?.id) {
      this.setState({
        open: true,
        error: new Error(this.props.error?.message),
      });
    }
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        {this.props.children}
        <Snackbar
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={this.handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {this.state.error
              ? this.state.error.message
              : "Something went wrong"}
          </Alert>
        </Snackbar>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  error:
    selectPokemonListError(state) ||
    selectPokemonsByTypeError(state) ||
    selectPokemonDetailsError(state) ||
    selectPokemonsError(state),
});

export default connect(mapStateToProps)(ErrorBoundary);
