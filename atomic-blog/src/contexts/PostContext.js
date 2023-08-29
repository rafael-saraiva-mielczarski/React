import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";

//1 - Criação de novo contexto
const PostContext = createContext();

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

//Criar uma func Provider é o recomendado quando se usa um Context, dentro dela você mantem tudo centralizado, desde estados até funções. Para utilizar esse hook é necessário retornar Provider com um children dentro

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  return (
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

//Invés de escrever e expor o postContext em todos os consumers que precisaram, é recomendado criar um hook para usar nos consumers, ficando ocm menos código e mais simples de entender
function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of PostProvider");
  return context;
}

export { usePosts, PostProvider };
