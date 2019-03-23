import React from "react";
import styled from "styled-components";
import baseStyle from "../../styles/base/setting";
import Category__ListItem from "./Category__ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCategory from "./AddCategory";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white
  color: ${baseStyle["dark-grey"]}
`;

const AddText = styled.div`
  color: ${baseStyle["blue"]}
  margin-bottom: ${baseStyle["s-size"]}
  padding: ${baseStyle["s-size"]} 0
  line-height: ${baseStyle["l-size"]}
  font-size: ${baseStyle["m-size"]}
  text-align: center;
  border-bottom: 1px solid ${baseStyle["blue"]}
`;

class Category__List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };
  render() {
    return (
      <ListContainer>
        <AddText onClick={this.handleOpenModal}>
          <FontAwesomeIcon icon="plus" /> Add a new category
        </AddText>
        <AddCategory
          showModal={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
        />
        {this.props.categories.map(category => {
          return <Category__ListItem category={category} />;
        })}
      </ListContainer>
    );
  }
}

export default Category__List;
