import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRedirectMessage: false,
      redirect: false
    };
  }

  componentDidMount() {
    // Afficher le message après le montage du composant
    this.setState({ showRedirectMessage: true });

    // Configurer un timer pour masquer le message après 3 secondes
    this.timer = setTimeout(() => {
      this.setState({ showRedirectMessage: false });
    }, 3000);
  }

  componentWillUnmount() {
    // Nettoyer le timer lors du démontage du composant
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }

    return (
      <Container className="text-center py-5">
        <h1 className="display-1">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead mb-4">
          The page you are looking for does not exist or has been moved.
        </p>

        {this.state.showRedirectMessage && (
          <div className="alert alert-info">
            Redirect to Movies page
          </div>
        )}

        <Button as={Link} to="/" variant="primary">
          Go to Movies Page
        </Button>
      </Container>
    );
  }
}

export default NotFound;
