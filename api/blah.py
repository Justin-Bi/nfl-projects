from Graph import Graph
import pickle
import json

if __name__ == "__main__":
    with open('./nfl_graph.pkl', 'rb') as f:
        vertexArray = pickle.load(f)
    # print(vertexArray.vertices)
    with open("sample.json", "w") as outfile:
        json.dump(vertexArray.vertices, outfile)
