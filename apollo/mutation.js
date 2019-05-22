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



