#include"allclasses.cpp"
using namespace std;
#include<string>
#include<cstdio>

int main() {
    string debug2;
    cout << "ATTENTION!!! . READ ME FIRST!!!" << endl;
    cout << "For the program to work as intended you have to first enter the amount of heaps you want," << endl;
    cout << "then press enter and after that enter the amount of players. Then you have to  fill  the " << endl;
    cout << "heaps with coins by entering the amount of coins of the first heap  then  press  spacebar" << endl;
    cout << "then the amount of the second heap ...etc, when you have filled all heaps press  enter.  " << endl;
    cout << "After that, you will have to fill in the profiles of the players. The  profiles  are  the" << endl;
    cout << "following. (Greedy, Sneaky, Spartan, Righteous), press the  profile  you  want  for  each" << endl;
    cout << "player and then press enter. ATTENTION ,for each player you have to write the profile  as" << endl;
    cout << "shown in the parenthesis, even if you change the first letter to lower case  the  program" << endl;
    cout << "will not work.";
    cout << endl;
    cout << "If you want to continue press ENTER: ";
    getline(cin, debug2);

    int h,p;
    cout << "Enter the amount of Heaps: ";
    cin >> h;
    cout << "Enter the amount of Players: ";
    cin >> p;

    Game specker(h, p);
    int coins[h+1];
    cout << "Enter the amount of coins for each heap: ";
    for(int i=0; i<h; i++){
        cin >> coins[i];
        specker.addHeap(coins[i]);
    }


    string debug;
    getline(cin, debug);

    string type;
    string counter;
    for(int i=0; i<p; i++){
        cout << "Enter the type of Player " << i+1 << ": ";
        getline(cin, type);
        counter = to_string(i+1);
        if(type=="Righteous"){specker.addPlayer(new RighteousPlayer(counter));}
        else if(type=="Greedy"){specker.addPlayer(new GreedyPlayer(counter));}
        else if(type=="Spartan"){specker.addPlayer(new SpartanPlayer(counter));}
        else if(type=="Sneaky"){specker.addPlayer(new SneakyPlayer(counter));}
    }
    specker.play(cout);
    return 0;
}
