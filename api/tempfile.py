from Graph import Graph
import pickle

if __name__ == "__main__":
    g = Graph()
    with open('./test_graph.pkl', 'wb') as f:
        pickle.dump(g, f)
