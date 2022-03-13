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
    console.log(node);
    return (
      <li
        className={node.parentId === null ? "text-red-500" : "bg-red-300 p-4"}
      >
        <a>{node.label}</a>
      </li>
    );
  });
  return (
    <div>
      <nav className="px-10 py-8 bg-green-200 flex place-items-center">
        <h1 className="text-2xl mr-auto">Logo Space</h1>
        <ul className="navigation flex place-items-center gap-8">
          {menuItems}
        </ul>
      </nav>
    </div>
  );
};

export default Home;
