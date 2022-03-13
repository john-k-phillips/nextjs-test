export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://jp.aztecmedia.dev/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query MenuLocation {
        menus(where: {location: MAX_MEGA_MENU_1}) {
          nodes {
            name
            menuItems {
              nodes {
                label
                url
                parentId
                id
              }
            }
          }
        }
      }
      `,
    }),
  });
  const menu = await res.json();

  // Pass data to the page via props
  return { props: { menu } };
}

const Home = ({ menu }) => {
  console.log(menu.data.menus.nodes[0].menuItems);
  const menuItems = menu.data.menus.nodes[0].menuItems.nodes.map((node) => {
    return (
      <li key={node.id}>
        <a
          className={`block rounded dark:text-white cursor-pointer ${
            node.parentId === null ? "text-blue-700" : "text-green-500"
          } ${
            node.label === "Contact Us"
              ? "bg-red-100 text-white p-4 rounded-xl hover:bg-red-200 "
              : ""
          }`}
        >
          {node.label}
        </a>
      </li>
    );
  });
  return (
    <div>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 mt-10">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="#" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              AztecMedia
            </span>
          </a>
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium place-items-center">
              {menuItems}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
