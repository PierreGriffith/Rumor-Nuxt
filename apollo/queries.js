import gql from 'graphql-tag'


export const ALL_BRANDS = gql`
      query{
       brands{
          _id
           name
    }
  }`;
