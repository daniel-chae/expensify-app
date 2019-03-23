import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import baseStyle from "../../styles/base/setting";
import Category__Header from "./Category__Header";
import Category__List from "./Category__List";

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

class ManageCategory extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <StyledReactModal
        isOpen={this.props.showModal}
        contentLabel="Manage Category"
      >
        <Category__Header handleCloseModal={this.props.handleCloseModal} />
        <Category__List categories={this.props.categories} />
      </StyledReactModal>
    );
  }
}

export default ManageCategory;
