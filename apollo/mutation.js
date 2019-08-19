import gql from "graphql-tag";

export const DELETE_BRAND = gql`
  mutation($_id :  ID!) {
        deleteBrand( _id : $_id ) {
         _id
         }
      }`;

export const CREATE_BRAND = gql`
  mutation($name :  String!) {
        createBrand( Brand: { name : $name } ) 
        { _id }
      }`;


export const UPDATE_BRAND = gql`
  mutation($_id :  ID!, $description: String!, $image: String!) {
        updateBrand(_id : $_id, Brand: { description : $description, image: $image } ) 
        { _id }
      }`;



export const DELETE_TYPE = gql`
  mutation($_id :  ID!) {
        deleteType( _id : $_id ) {
         _id
         }
      }`;


export const CREATE_TYPE = gql`
  mutation($name :  String!, $brand_id: String!) {
        createType( Type: { name : $name, brand_id: $brand_id } ) 
        { _id }
      }`;


export const DELETE_REF = gql`
  mutation($_id :  ID!) {
        deleteReference( _id : $_id ) {
         _id
         }
      }`;


export const UPDATE_REF = gql`
  mutation($_id :  ID!, $name: String!, $end: String!, $begin: String!, $description: String!, $brand_id: String!, $type_id: String! ) {
        updateReference( _id : $_id, Reference: {name: $name, end: $end, begin: $begin, description: $description, brand_id: $brand_id, type_id: $type_id }) {
         _id
         }
      }`;


export const CREATE_REF = gql`
  mutation($name: String!, $brand_id: String!, $type_id: String!) {
        createReference( Reference: { name : $name, brand_id: $brand_id, type_id: $type_id } ) {
         _id
         }
      }`;


export const CREATE_VALUE = gql`
  mutation($link: String!, $price: String!, $date: String!, $brand_id: String!, $reference_id: String!, $type_id: String!, $sell: Boolean!) {
        createValue( Value: { link: $link, price: $price, date: $date, brand_id: $brand_id, reference_id: $reference_id, type_id: $type_id, sell: $sell } ) {
         _id
         }
      }`;


export const DELETE_VALUE = gql`
  mutation($_id :  ID!) {
        deleteValue( _id : $_id ) {
         _id
         }
      }`;


