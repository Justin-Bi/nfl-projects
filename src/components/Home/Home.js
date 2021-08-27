import React from "react";
import "./Home.scss";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to NFL Projects!</h1>
      <p>
        This website is a collection of projects I created relating to NFL
        players and their network connectivity. Use the links in the navigation
        bar to learn more about them!
      </p>
      <h3>How Things Work</h3>
      <p>
        The graph was built using{" "}
        <a href="https://sportsipy.readthedocs.io/en/stable/">sportsipy</a>,
        which grabs info from the{" "}
        <a href="https://www.pro-football-reference.com/">
          Pro Football Reference website
        </a>
        . By iterating over every team that has existed across every year of the
        NFL and connecting each team to all of its roster members, I created a
        bipartite graph between teams and players. This graph was{" "}
        <strong>last updated on 07/29/2021</strong> and will continue to be
        updated as roster changes occur.
      </p>
      <p>
        From this graph, we can implement a{" "}
        <a href="https://en.wikipedia.org/wiki/Six_degrees_of_separation">
          six degrees of separation
        </a>{" "}
        search by running breadth-first search from any player to any other
        player, thus connecting any two players via mutual teammates (for this
        site's purpose, players are teammates if they've been on the same roster
        before, according to the data from Pro Football Reference).
      </p>
      <p>
        Another use of this graph is to find all the teammates of a player. Take
        any node in the graph and return all nodes two edges away (it's two
        edges due to an intermediate team node). This leads to fun insights,
        like how Ryan Fitpatrick has had nearly double the amount of teammates
        as Aaron Rodgers, despite being drafted in the same year (probably since
        Fitpatrick has been on nine teams, compared to Rodgers's one). Also
        interesting is that Fitpatrick has more teammates than Tom Brady,
        despite Brady having been in the NFL four more years than Fitzpatrick.
      </p>
      <h3>The Data and the Code</h3>
      <p>
        All the data and the code can be found on my{" "}
        <a href="https://github.com/justin-bi/nfl-projects">GitHub repo</a>{" "}
        (ignore all my testing files haha). For Python users, check the api
        folder, the graph is stored in "nfl_graph_4.pkl" and the functions are
        stored in "Graph.py". For JavaScript users, check the
        src/components/Graph folder, the main graph is stored in JSON form in
        "graph.json", and the functions are stored in "Graph.js".
      </p>
    </div>
  );
}

export default Home;
