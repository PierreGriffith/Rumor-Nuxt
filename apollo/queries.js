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



export const GET_BRAND_BY_ID = gql`
    query($_id :  ID!){
       brand_by_id(_id : $_id){
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

export const GET_TYPE = gql`
   query($_id :  ID!){
      type( _id : $_id) {
    _id
    name
    brand_id
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
    sell
    reference_id
  }
}`;



export const GET_VALUES_BY_REF = gql`
   query($ref_name : String!){
      value_by_ref(ref_name : $ref_name) {
    _id
    price
    type_id
    reference_id
    sell
  }
}`;



export const ALL_USERS = gql`
       query{
      users{
        _id 
        name
        email
        password
        birthday
        creation
        newsletter
        admin
    }
  }`;







