import React from "react";
import styled from "styled-components";
import baseStyle from "../../styles/base/setting";

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  background: white
  color: ${baseStyle["dark-grey"]}
  margin-bottom: ${baseStyle["s-size"]}
  padding: 0 ${baseStyle["s-size"]}
  line-height: ${baseStyle["l-size"]}
  overflow: auto
  font-size: ${baseStyle["m-size"]}
`;

const ListItem_Right = styled.div`
  margin-left: auto;
  margin-right: ${baseStyle["m-size"]};
`;

const Category__ListItem = props => (
  <ListItem>
    <div>{props.category}</div>
    <ListItem_Right>edit</ListItem_Right>
    <div>remove</div>
  </ListItem>
);

export default Category__ListItem;
