import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );

// }

// export default App;

// const NEW_POST_NEWS = gql`
//   mutation postNew($files: Upload) {
//     postNew(files: $files) {
//       newsboard
//     }
//   }
// `;

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
