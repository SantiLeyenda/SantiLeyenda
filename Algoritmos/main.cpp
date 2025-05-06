
#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
#include <climits>
#include <cmath>
#include <string>
#include <sstream>
#include <limits>
#include <functional>

using namespace std;

typedef pair<int, int> DistNodo;

// NOTA IMPORTANTE
/*
Tipo de entrada:
- El primer num (N) es la cantidad de colonias
- Luego se ingresan dos matrices de tama�o NxN donde cada matriz representa las distancias entre las colonias
- Se agrega una tercera que es la ubicacion de la nueva contratacion como par de coordenadas (x, y) (PUNTO4 CANVAS)
Ejemplo de entrada:
4
0 16 45 32
16 0 18 21
45 18 0 7
32 21 7 0
0 48 12 18
52 0 42 32
18 46 0 56
24 36 52 0
150 250
300 400
450 350
600 500
200 300
*/

using namespace std;

// ESTRUCTURAS
struct Arista {
    int origen, destino, peso; // Guarda origen, destino y peso de la arista
};

struct Grafo {
    int V, E; // V: cantidad de vertices y E: cantidad de aristas
    vector<Arista> aristas; // Lista de aristas

    Grafo(int V, int E) : V(V), E(E) {} // Constructor para inicializar V y E

    void agregarArista(int u, int v, int w) { // Agrega arista al grafo
        aristas.push_back({u, v, w}); // Almacena la nueva arista
    }
};

struct ConjuntosDisjuntos {
    vector<int> padre, rango; // Almacena el padre y rango para union

    ConjuntosDisjuntos(int n) { // Constructor para inicializar
        padre.resize(n);
        rango.resize(n, 0);
        for (int i = 0; i < n; i++) {
            padre[i] = i; // Cada nodo es su propio padre al inicio
        }
    }

    int encontrar(int u) { // Encuentra el padre del nodo u
        if (u != padre[u]) {
            padre[u] = encontrar(padre[u]); // Compresion de caminos
        }
        return padre[u]; // Devuelve el padre
    }

    void fusionar(int x, int y) { // Fusiona dos conjuntos
        x = encontrar(x); // Encuentra el padre de x
        y = encontrar(y); // Encuentra el padre de y
        if (rango[x] > rango[y]) {
            padre[y] = x; // Une por rango
        } else {
            padre[x] = y; // Une el menor rango
            if (rango[x] == rango[y]) {
                rango[y]++; // Aumentar rango si son iguales
            }
        }
    }
};

// FUNCIONES
bool comparadorAristas(const Arista& a, const Arista& b) {
    return a.peso < b.peso; // Comparar pesos de aristas
}

vector<Arista> calcularMST(Grafo& grafo) {
    vector<Arista> resultado; // Almacena el resultado del MST
    sort(grafo.aristas.begin(), grafo.aristas.end(), comparadorAristas); // Ordenar aristas por peso

    ConjuntosDisjuntos ds(grafo.V); // Inicializar conjuntos disjuntos
    for (const auto& arista : grafo.aristas) {
        int u = arista.origen, v = arista.destino;
        if (ds.encontrar(u) != ds.encontrar(v)) { // Si no forman ciclo
            resultado.push_back(arista); // Agregar arista al MST
            ds.fusionar(u, v); // Fusionar los conjuntos
        }
    }
    return resultado; // Retornar aristas del MST
}

pair<int, string> tsp(int n, const vector<vector<int>>& matrizAdyacente, int inicio) {
    vector<vector<int>> dp(1 << n, vector<int>(n, INT_MAX)); // Inicializa DP
    dp[1 << inicio][inicio] = 0; // Comienza desde el nodo inicial

    for (int mascara = 0; mascara < (1 << n); ++mascara) {
        for (int u = 0; u < n; ++u) {
            if (mascara & (1 << u)) { // Si u est� en la mascara
                for (int v = 0; v < n; ++v) {
                    if (!(mascara & (1 << v))) { // Si v no est� en la mascara
                        // Actualiza la distancia
                        dp[mascara | (1 << v)][v] = min(dp[mascara | (1 << v)][v], dp[mascara][u] + matrizAdyacente[u][v]);
                    }
                }
            }
        }
    }

    int longitud_minima = INT_MAX; // Inicializa longitud minima
    string ruta_minima; // Para almacenar la ruta
    int mascara_final = (1 << n) - 1; // Mascara final con todos los nodos visitados

    // Encontrar longitud minima y ruta
    for (int u = 0; u < n; ++u) {
        if (u != inicio) {
            longitud_minima = min(longitud_minima, dp[mascara_final][u] + matrizAdyacente[u][inicio]); // Checar caminos
        }
    }

    vector<int> camino = {inicio}; // Almacena el camino recorrido
    int mascara_actual = mascara_final; // Mascara actual
    int vertice_actual = inicio; // Vertice actual

    while (camino.size() < n) { // Mientras no se hayan visitado todos
        int siguiente_vertice = -1; // Para el siguiente vertice
        for (int v = 0; v < n; ++v) {
            // Checa condiciones para el siguiente vertice
            if (mascara_actual & (1 << v) && v != vertice_actual &&
                dp[mascara_actual][vertice_actual] == dp[mascara_actual ^ (1 << vertice_actual)][v] + matrizAdyacente[v][vertice_actual]) {
                siguiente_vertice = v; // Actualiza el siguiente vertice
                break;
            }
        }
        camino.push_back(siguiente_vertice); // Agrega al camino
        mascara_actual ^= (1 << vertice_actual); // Actualiza mascara
        vertice_actual = siguiente_vertice; // Cambia vertice actual
    }
    camino.push_back(inicio); // Regresa al inicio

    // Construir la ruta como cadena
    stringstream ss_ruta;
    for (int i = 0; i < camino.size(); ++i) {
        ss_ruta << char('A' + camino[i]); // Convierte a letras
        if (i < camino.size() - 1) {
            ss_ruta << " "; // Espacio entre nodos
        }
    }

    return {longitud_minima, ss_ruta.str()}; // Retorna longitud y ruta
}

bool busquedaEnAnchura(const vector<vector<int>>& grafoResidual, int s, int t, vector<int>& padre) {
    int V = grafoResidual.size();
    vector<bool> visitado(V, false); // Para marcar visitados
    queue<int> q;
    q.push(s); // Comienza desde el origen
    visitado[s] = true; // Marca origen como visitado

    while (!q.empty()) {
        int u = q.front(); // Nodo actual
        q.pop();

        for (int v = 0; v < V; v++) {
            if (!visitado[v] && grafoResidual[u][v] > 0) { // Si no visitado y hay flujo
                padre[v] = u; // Guarda el padre
                if (v == t) {
                    return true; // Si se encuentra el destino
                }
                q.push(v); // Agrega a la cola
                visitado[v] = true; // Marca como visitado
            }
        }
    }
    return false; // No se encontro camino
}

int algoritmoFordFulkerson(const vector<vector<int>>& capacidadFlujo, int s, int t) {
    int V = capacidadFlujo.size();
    vector<vector<int>> grafoResidual = capacidadFlujo; // Copia de capacidad
    vector<int> padre(V); // Para almacenar padres
    int flujo_maximo = 0; // Flujo maximo

    while (busquedaEnAnchura(grafoResidual, s, t, padre)) { // Busca caminos
        int flujo_caminos = INT_MAX; // Inicializa flujo

        for (int v = t; v != s; v = padre[v]) { // Rastrear camino
            int u = padre[v];
            flujo_caminos = min(flujo_caminos, grafoResidual[u][v]); // Encuentra flujo minimo
        }

        for (int v = t; v != s; v = padre[v]) { // Actualiza capacidades
            int u = padre[v];
            grafoResidual[u][v] -= flujo_caminos; // Resta del flujo
            grafoResidual[v][u] += flujo_caminos; // Agrega al flujo inverso
        }

        flujo_maximo += flujo_caminos; // Sumar flujo del camino encontrado
    }

    return flujo_maximo; // Retornar flujo maximo
}



// Las dos funciones de abajo son para encontrar la central mas cerca 


// Esta es la funcion de dijkstra que nos ayuda a conseguir la distancia de un nodo a todos los demas nodos


vector<int> dijkstra(const vector<vector<int> >& adjMatrix, int src) {
    int V = adjMatrix.size();
    vector<int> dist(V, INT_MAX); 
    priority_queue<DistNodo, vector<DistNodo>, greater<DistNodo> > pq; 

    dist[src] = 0;
    pq.push(make_pair(0, src)); 

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();

        for (int v = 0; v < V; v++) {
            if (adjMatrix[u][v] && dist[u] != INT_MAX && dist[u] + adjMatrix[u][v] < dist[v]) {
                dist[v] = dist[u] + adjMatrix[u][v];
                pq.push(make_pair(dist[v], v)); 
            }
        }
    }

    return dist;
}

// Esta es la funcion para decir cual es la central mas cerca 
// Simplemente hacemos un foor loop de las distancias a las centralas
// La que este mas pequeña es la que se retorna 

int encontrarCentralCerca(const vector<vector<int> >& adjMatrix, const vector<int>& estacionesCentrales, int nuevoNodo) {
    vector<int> distanciaDeNodoNuevo = dijkstra(adjMatrix, nuevoNodo);

    int distanciaMinima = INT_MAX;
    int estacionMasCerca = -1;

    for (int estacion : estacionesCentrales) {
        if (distanciaDeNodoNuevo[estacion] < distanciaMinima) {
            distanciaMinima = distanciaDeNodoNuevo[estacion];
            estacionMasCerca = estacion;
        }
    }

    return estacionMasCerca;
}

int main() {
    int N;
    cout << "Ingrese la cantidad de colonias (N): ";
    cin >> N;

    Grafo grafo(N, 0);
    vector<vector<int>> matrizAdyacente(N, vector<int>(N));
    vector<vector<int>> capacidadFlujo(N, vector<int>(N));

    cout << "Ingrese la matriz de distancias (NxN):\n";
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cin >> matrizAdyacente[i][j];
            if (matrizAdyacente[i][j] != 0) {
                grafo.agregarArista(i, j, matrizAdyacente[i][j]);
                grafo.E++;
            }
        }
    }

    
    cout << "Ingrese la matriz de capacidades de flujo (NxN):\n";
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cin >> capacidadFlujo[i][j];
        }
    }


 
    // Punto 1: forma óptima de cablear 
   
    cout << "\n1: Forma óptima de cablear con fibra óptica\n";
    vector<Arista> mst = calcularMST(grafo);
    for (const auto& e : mst) {
        cout << "(" << char('A' + e.origen) << ", " << char('A' + e.destino) << ")\n";
    }

    // Punto 2: Ruta a considerar
  
    cout << "\n2: Ruta para repartir correspondencia\n";
    auto [longitud_minima, ruta] = tsp(N, matrizAdyacente, 0);
    cout << "Ruta: " << ruta << endl;

    
    // Punto 3: Flujo máximo

    cout << "\n3: Flujo máximo de información\n";
    int flujo_maximo = algoritmoFordFulkerson(capacidadFlujo, 0, N - 1);
    cout << "Flujo máximo: " << flujo_maximo << endl;

    // Punto 4: Central mas cerca

    int numCentrales;
    cout << "Ingrese el número de estaciones centrales: ";
    cin >> numCentrales;

    vector<int> centralStations;
    cout << "Ingrese los índices de las estaciones centrales (0 a " << N-1 << "):\n";
    for (int i = 0; i < numCentrales; i++) {
        int central;
        cin >> central;
        centralStations.push_back(central);
    }

 
    int nodoObjetivo;
    cout << "Ingrese el índice del nodo para verificar la estación central más cercana (0 a " << N-1 << "):\n";
    while (true) {
        cin >> nodoObjetivo;
    
        if (find(centralStations.begin(), centralStations.end(), nodoObjetivo) == centralStations.end()) {
            break;
        }
        cout << "El nodo ingresado es una estación central. Ingrese un nodo que no sea central: ";
    }

    
    cout << "\n4: Central más cercana\n";
    int indiceCentralCercana = encontrarCentralCerca(matrizAdyacente, centralStations, nodoObjetivo);
    if (indiceCentralCercana != -1) {
        cout << "La estación central más cercana al nodo " << nodoObjetivo << " es la estación " << indiceCentralCercana << endl;
    } else {
        cout << "No hay centrales disponibles." << endl;
    }

    return 0;
}