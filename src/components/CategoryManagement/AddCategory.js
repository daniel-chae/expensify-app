import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import baseStyle from "../../styles/base/setting";
import { connect } from "react-redux";
import { startAddCategory } from "../../actions/category";

const StyledReactModal = styled(ReactModal)`
border-radius: 1%;
display: flex;
flex-direction: column;
background: white;
position: absolute;
width: ${baseStyle["desktop-breakpoint"]}
left: 50%;
top: 50%;
transform:translate(-50%, -50%);
height: ${baseStyle["desktop-breakpoint"]}
overflow: auto;
WebkitOverflowScrolling: 'touch';
outline: none;
background-color: white;
@media (max-width: ${baseStyle["desktop-breakpoint"]}) {
    width: 100%
    height: 100%
    background: white
}
`;

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategory: !!this.props ? this.props.category : ""
    };
  }
  handleCloseModal = () => {
    this.props.handleCloseModal();
    this.setState(() => ({
      newCategory: ""
    }));
  };

  onNewCategoryChange = e => {
    const newCategory = e.target.value;
    this.setState(() => ({
      newCategory
    }));
  };

  onCategorySubmit = e => {
    e.preventDefault();
    const newCategory = this.state.newCategory;
    console.log("new category", newCategory);
    this.props.startAddCategory(newCategory).then(() => {
      this.props.handleCloseModal();
      this.setState(() => ({
        newCategory: ""
      }));
    });
  };

  render() {
    return (
      <StyledReactModal
        isOpen={this.props.showModal}
        contentLabel="Add Category"
      >
        <button onClick={this.handleCloseModal}>Cancel</button>
        <form onSubmit={this.onCategorySubmit}>
          <input
            type="text"
            value={this.state.newCategory}
            placeholder="New category to add"
            onChange={this.onNewCategoryChange}
          />
          <button>Save</button>
        </form>
      </StyledReactModal>
    );
  }
}

const mapDispatchToProp = dispatch => {
  return {
    startAddCategory: newCategory => dispatch(startAddCategory(newCategory))
  };
};

export default connect(
  undefined,
  mapDispatchToProp
)(AddCategory);
