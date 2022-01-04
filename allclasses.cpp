#include <iostream>
#include <stdexcept>

using namespace std;

class Move {
public:
	Move(int sh, int sc, int th, int tc);

	int getSource() const;
	int getSourceCoins() const;
	int getTarget() const;
	int getTargetCoins() const;

	friend ostream & operator << (ostream &out, const Move &move);
private:
	int source_heap, target_heap, source_coins, target_coins;
};

class State {
public:
	//State with h heaps, where the i-th heap starts with c[i] coins
	State(int h, const int c[]);
	~State();

	void next(const Move &move) throw(logic_error);
	bool winning() const;

	int getHeaps() const;
	int getCoins(int h) const throw(logic_error);

	friend ostream & operator << (ostream &out, const State &state);

private:
	int heaps;
	int *heap_coins;
};

Move::Move(int sh, int sc, int th, int tc){

	source_heap = sh;
	source_coins = sc;
	target_heap = th;
	target_coins = tc;
}

int Move::getSource() const{
	return source_heap;
}

int Move::getSourceCoins() const{
	return source_coins;
}

int Move::getTarget() const{
	return target_heap;
}

int Move::getTargetCoins() const{
	return target_coins;
}

ostream & operator << (ostream &out, const Move &move){

	if ( move.getTargetCoins() != 0){
		out << "takes " << move.getSourceCoins() << " coins from heap " << move.getSource() << " and puts " << move.getTargetCoins() << " coins to heap " << move.getTarget();
	}
	else{
		out << "takes " << move.getSourceCoins() << " coins from heap " << move.getSource() << " and puts nothing";
	}
	return out;
}

State::State(int h, const int c[]){  //DONE
	heaps = h;
	heap_coins = new int [heaps];
	for (int j=0; j<h; j++){
		heap_coins[j] = c[j];

	}
}

State::~State(){
	delete [] heap_coins;
	return;
}

void State::next(const Move &move) throw(logic_error){

	if ( (move.getSource() < 0) || (move.getSource() > heaps) || (move.getTarget() < 0) || (move.getTarget() > heaps) ){
		throw logic_error("Invalid Heap!");
		return;
	}
	else if ( (move.getSourceCoins() < 1) || (move.getTargetCoins() < 0) || (move.getSourceCoins() <= move.getTargetCoins()) || ( move.getSourceCoins() > getCoins(move.getSource()) )) {

		throw logic_error("Hmmm...Coin problem!");
	}
	else{
		heap_coins[move.getSource()] -= move.getSourceCoins();
		heap_coins[move.getTarget()] += move.getTargetCoins();
	}
}

bool State::winning() const{
	int u=0;
	for (int i=0; i < heaps; i++){
		u += getCoins(i);
	}
	if ( u > 0){
		return false;
	}
	else return true;
}

int State::getHeaps() const {
	return heaps;
}

int State::getCoins(int h) const throw(logic_error){
	if ((h >= heaps) || (h < 0) ){
		throw logic_error("Heaps: starting from 1, reaching 'heaps' ");
		return 1;
	}
	else{
		return heap_coins[h];
	}
}


ostream & operator << (ostream &out, const State &state){

	int k;
	for (k=0; k < state.getHeaps()-1 ; k++){
		out << state.heap_coins[k] << ", ";
	}
	if ( k > 0 ){
		out << state.heap_coins[k];
	}
return out;
}

class Player {
public:
	Player(const string &n);
	virtual ~Player();

	virtual const string & getType() const = 0;
	virtual Move play(const State &s) = 0;

	friend ostream & operator << (ostream &out, const Player &player);

protected:
	string my_name;
};

class GreedyPlayer : public Player {
public:
	GreedyPlayer(const string &n) : Player(n) {
		sub_name = "Greedy";
	}
	virtual const string & getType() const override {
		return sub_name;
	}

	virtual Move play(const State &s) override {
		int source_heap = 0;
		int source_coins = 0;
		for (int i=0; i < s.getHeaps(); i++) {
			if ( s.getCoins(i) > source_coins) {
				source_heap = i;
				source_coins = s.getCoins(i);
			}
		}
		Move GreedyObject(source_heap, source_coins, 0, 0);
	return GreedyObject;
	}
private:
	string sub_name;
};

class SpartanPlayer : public Player {
public:
	SpartanPlayer(const string &n) : Player(n) {
		sub_name = "Spartan";
	}
	virtual const string & getType() const override {
		return sub_name;
	}

	virtual Move play(const State &s) override {
		int source_heap = 0;
		int source_coins = 0;
		for (int i=0; i < s.getHeaps(); i++) {
			if ( s.getCoins(i) > source_coins) {
				source_heap = i;
				source_coins = s.getCoins(i);
			}
		}
		Move SpartanObject(source_heap, 1, 0, 0);
	return SpartanObject;
	}
private:
	string sub_name;
};

class SneakyPlayer : public Player {
public:
	SneakyPlayer(const string &n) : Player(n) {
		sub_name = "Sneaky";
	}
	virtual const string & getType() const override {
		return sub_name;
	}

	virtual Move play(const State &s) override {
		int j = 0;
		while ( s.getCoins(j) == 0){
			j++;
		}
		int source_heap = j;
		int source_coins = s.getCoins(j);
		for (int i=j+1; i < s.getHeaps(); i++) {
			if ( (s.getCoins(i) < source_coins) && (s.getCoins(i) > 0 )) {
				source_heap = i;
				source_coins = s.getCoins(i);
			}
		}
		Move SneakyObject(source_heap, source_coins, 0, 0);
	return SneakyObject;
	}
private:
	string sub_name;
};

class RighteousPlayer : public Player {
public:
	RighteousPlayer(const string &n) : Player(n) {
		sub_name = "Righteous";
	}
	virtual const string & getType() const override {
		return sub_name;
	}

	virtual Move play(const State &s) override {
		int target_heap = 0;
		int source_heap = 0;
		int source_coins = s.getCoins(0);
		int target_coins = source_coins;

		for (int i=1; i < s.getHeaps(); i++) {
			if ( s.getCoins(i) > source_coins) {
				source_heap = i;
				source_coins = s.getCoins(i);
			}
			else if ( s.getCoins(i) < target_coins) {
				target_heap = i;
				target_coins = s.getCoins(i);
			}
		}
		source_coins -= source_coins/2;
		Move RighteousObject(source_heap, source_coins, target_heap, source_coins - 1);
	return RighteousObject;
	}
private:
	string sub_name;
};

Player::Player(const string &n) {
	my_name = n;
}

Player::~Player() {
	my_name.clear();
}

ostream & operator << (ostream &out, const Player &player) {
	out << player.getType() << " player " << player.my_name;
return out;
}

class Game {
public:
	Game(int heaps, int players);
	~Game();

	void addHeap(int coins) throw(logic_error);
	void addPlayer(Player *player) throw(logic_error);
	void play(ostream &out) throw(logic_error);
private:
	int my_heaps, my_players, heap_counter, player_counter;
	int *heap_money;
	Player **player_table;
};

Game::Game(int heaps, int players) {
	my_heaps = heaps;
	my_players = players;
	heap_counter = 0;
	player_counter = 0;
	heap_money = new int [my_heaps];
	player_table = new Player*[my_players];
}

Game::~Game() {
	delete [] heap_money;
	delete [] player_table;
}

void Game::addHeap(int coins) throw(logic_error) {
	if (coins < 0) { throw logic_error ("Coins must not be a negative number"); }
	else if ( heap_counter >= my_heaps ) { throw logic_error ("You cant put more heaps!!");}
	else {
		heap_money[heap_counter] = coins;
		heap_counter++;
	}
}

void Game::addPlayer(Player *player) throw(logic_error) {
	if ( player_counter >= my_players) {throw logic_error("Player number exceeded!");}
	else {
		player_table[player_counter] = player;
		player_counter++;
	}
}

void Game::play(ostream &out) throw(logic_error) {
	if ( (player_counter != my_players) && (heap_counter != my_heaps)){
		throw logic_error("Incorrect number of heaps/players!");
	}
	else {
		int i = 0;
		State Stateobject(my_heaps, heap_money);
		while ( !Stateobject.winning()){
			out << "State: " << Stateobject << endl;
			out << *player_table[i%my_players] << " " << player_table[i%my_players]->play(Stateobject) << endl;
			Stateobject.next(player_table[i%my_players]->play(Stateobject));

			i++;
		}
		out << "State: " << Stateobject << endl;
		i--;
		out << *player_table[i%my_players] << " wins" << endl;
	}
}
