import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const NEW_POST_NEWS = gql`
  mutation upload($file: Upload!) {
    upload(file: $file) {
      success
    }
  }
`;

class BoardNewsInput extends React.Component {
  state = {
    images: [],
  };

  render() {
    return (
      <div>
        <input
          type="file"
          name="image"
          onChange={({
            target: {
              validity,
              files: [file],
            },
          }) =>
            validity.valid &&
            this.setState({
              images: [...this.state.images, file],
            })
          }
        />
        <Mutation
          mutation={NEW_POST_NEWS}
          variables={{
            file: this.state.images ? this.state.images[0] : null,
          }}
        >
          {(cudNewsboard, { loading, error, data }) => (
            <button
              onClick={() => {
                console.log(this.state.images);
                cudNewsboard();
              }}
            >
              POST
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default BoardNewsInput;
