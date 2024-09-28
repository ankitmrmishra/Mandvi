import request, { gql } from "graphql-request";
import {
  GetPostsArgs,
  GetPostsResponse,
  SubscribeToNewsletterResponse,
  PublicationName,
  GetPostBySlugResponse,
} from "./types";

const endpoint = process.env.NEXT_PUBLIC_HASHNODE_ENDPOINT;
const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;

export async function getBlogName() {
  const query = gql`
    query getBlogName($host: String!) {
      publication(host: $host) {
        title
        displayTitle
        favicon
      }
    }
  `;

  const response = await request<PublicationName>(endpoint, query, {
    host,
  });

  return {
    title: response.publication.title,
    displayTitle: response.publication.displayTitle,
    favicon: response.publication.favicon,
  };
}

export async function getPosts({ first = 9, pageParam = "" }: GetPostsArgs) {
  const query = gql`
    query Publication($host: String!, $first: Int!, $after: String) {
      publication(host: $host) {
        posts(first: $first, after: $after) {
          edges {
            node {
              id
              title
              subtitle
              slug
              content {
                text
              }
              coverImage {
                url
              }
              author {
                name
                profilePicture
              }
            }
            cursor
          }
        }
      }
    }
  `;

  const response = await request<GetPostsResponse>(endpoint, query, {
    host,
    first,
    after: pageParam,
  });

  return response.publication.posts.edges;
}

export async function subscribeToNewsletter(email: string) {
  const mutation = gql`
    mutation subscribeToNewsletter($host: String!, $email: String!) {
      subscribeToNewsletter(input: { email: $email, publicationHost: $host }) {
        status
      }
    }
  `;

  const response = await request<SubscribeToNewsletterResponse>(
    endpoint,
    mutation,
    {
      host,
      email,
    }
  );

  return response;
}

export async function getPostBySlug(slug: string) {
  const query = gql`
    query getPostBySlug($host: String!, $slug: String!) {
      publication(host: $host) {
        post(slug: $slug) {
          title
          subtitle
          coverImage {
            url
          }
          content {
            html
          }
          author {
            name
            profilePicture
          }
        }
      }
    }
  `;

  const response = await request<GetPostBySlugResponse>(endpoint, query, {
    host,
    slug,
  });

  return response.publication.post;
}
