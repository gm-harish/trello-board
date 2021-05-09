import React from 'react';
import {connect} from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CardComponent.css';
import {removeCard} from './app/redux/listActions';

class CardComponent extends React.Component {
  render() {
    return (
      <Card style={{margin: '5px'}}>
        <Card.Header>
          {this.props.card.title}
          <Button
            className="removeButtonCss"
            variant="outline-danger"
            size="sm"
            onClick={() => {
              this.props.dispatch(
                removeCard(this.props.listIndex, this.props.cardIndex)
              );
            }}
          >
            Remove Product
          </Button>
        </Card.Header>
        <Card.Body>
          <Card.Text>{this.props.card.desc}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default connect()(CardComponent);
