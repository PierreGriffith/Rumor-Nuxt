import gql from 'graphql-tag'


export const ALL_BRANDS = gql`
      query{
       brands{
          _id
           name
           image
           description
    }
  }`;


export const GET_BRAND = gql`
    query($name :  String!){
       brand(Brand:{ name: $name}){
    	_id
      description
      image
      name
    }
  }`;



export const ALL_TYPE = gql`
   query($_id :  ID!){
      types( _id : $_id) {
    _id
    name
  }
}`;

export const GET_TYPE_BY_NAME = gql`
    query($name :  String!, $brand: String!){
       type_name(name: $name, brand: $brand){
    	_id
      name
      
    }
  }`;




export const ALL_REF = gql`
   query($_id :  ID!){
      references( _id : $_id) {
    _id
    name
    end
    begin
  }
}`;


export const ALL_VALUES = gql`
   query($_id :  ID!){
      values( _id : $_id) {
    _id
    price
    date
    link
    sell
  }
}`;


