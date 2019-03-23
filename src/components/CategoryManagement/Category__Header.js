import React from "react";
import styled from "styled-components";
import baseStyle from "../../styles/base/setting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${baseStyle["red"]};
  color: white;
  div {
    font-size: ${baseStyle["m-size"]};
    padding: ${baseStyle["s-size"]} ${baseStyle["m-size"]};
  }
`;

const Category__Header = props => (
  <HeaderContainer>
    <div>Manage Category</div>
    <div onClick={props.handleCloseModal}>
      <FontAwesomeIcon icon="times" />{" "}
    </div>
  </HeaderContainer>
);

export default Category__Header;
