#include <iostream>
#include <cstdlib>
#include <windows.h>
#include <deque>
#include <conio.h>
#include <time.h>
#include <fstream>
#include <sstream>
#include <string>
#define WIDTH 120
#define HEIGHT 29

using namespace std;
static const int N = 20;


HANDLE h = GetStdHandle(STD_OUTPUT_HANDLE);
COORD c;
enum Dir {UP,RIGHT,DOWN,LEFT} dir;
Dir befor = RIGHT;
enum Bon {GROW,SPEED,DELAY};
int score = 0;
deque<char> x,y;
deque <char> bonusX, bonusY;
deque <Bon> bonus;

time_t snake_t, bonus_t, snake_delay, bonus_delay;
void gotoxy(char x,char y)
{
    c.X =x;
    c.Y = y;
    SetConsoleCursorPosition(h,c);
}

void GameOver()
{
    ifstream plik;
    plik.open( "Wyniki.txt" );
    system("pause > nul");
    system("cls");
    cout<<"                      Game Over"<<endl<<"Your score: "<<score<<endl;
    string t[2];
    for(int i =0; !plik.eof(); i++)
    {
        getline(plik, t[i]);
    }


    if(score >  atoi(t[1].c_str()) )
    {
        char buffer[33];
        plik.close();
        ofstream plik2;
        plik2.open("Wyniki.txt");
        cout<<"Osiagnales najelszpy wynik podaj imie: ";
        cin>>t[0];
        t[1]=itoa(score,buffer,10);
        plik2<<t[0]<<endl<<t[1];
        plik2.close();

    }
    cout<<"Best score: " <<t[0]<<" "<<t[1];


    exit(0);
}

int main()
{
    char r = (char) 186;
    system("title Snake Konsolowy");
    SetConsoleTextAttribute(h,12);
    srand(time(NULL));
    dir =RIGHT;
    snake_t = bonus_t = clock();
    snake_delay = 10;
    bonus_delay = 250;
    score =0;

    for(int i=0; i<WIDTH; i++)
        cout<<(char) 219;

    for(int i=0; i<HEIGHT; i++)
    {
        cout<<endl<<(char) 219;
        gotoxy(WIDTH-1,i);
        cout<<(char) 219;
    }
    cout<<endl;
    for(int i=0; i<WIDTH; i++)
        cout<<(char) 219;


    x.push_front(WIDTH/2);
    y.push_front(HEIGHT/2);
    x.push_front(WIDTH/2);
    y.push_front(HEIGHT/2 -1);
    x.push_front(WIDTH/2);
    y.push_front(HEIGHT/2 -2);
    x.push_front(WIDTH/2);
    y.push_front(HEIGHT/2 -3);
    x.push_front(WIDTH/2);
    y.push_front(HEIGHT/2 -4);
    for(;;)
    {
        if(kbhit())
        {
            switch(getch())
            {
            case 'W':
            case 'w':
                if(dir !=DOWN)
                    dir=UP;
                break;
            case 'A':
            case 'a':
                if(dir !=RIGHT)
                    dir=LEFT;
                break;
            case 'S':
            case 's':
                if(dir !=UP)
                    dir=DOWN;
                break;
            case 'D':
            case 'd':
                if(dir !=LEFT)
                    dir=RIGHT;
                break;
            }
        }

        if(clock()-snake_t > snake_delay)
        {
            SetConsoleTextAttribute(h,14);

            switch(dir)
            {

            case UP:
                snake_delay = 75;

                if(befor==UP){
                r=186;
                y.front()--;
                }
                if(befor==RIGHT)
                r=188;
                if(befor==LEFT)
                r=200;
                befor =UP;
                break;
            case RIGHT:
                snake_delay = 50;

                if(befor==UP)
                r=201;
                if(befor==RIGHT){
                x.front()++;
                r=205;
                }
                if(befor==DOWN)
                r=200;
                befor =RIGHT;
                break;
            case DOWN:
                snake_delay = 75;
                if(befor==RIGHT)
                r=187;
                if(befor==DOWN){
                r=186;
                y.front()++;
                }
                if(befor==LEFT)
                r=201;
                befor =DOWN;
                break;
            case LEFT:
                if(befor==LEFT){
                r=205;
                x.front()--;
                }
                if(befor==DOWN)
                r=188;
                if(befor==UP)
                r=187;
                snake_delay = 50;
                befor =LEFT;
                break;

            }

            x.push_front(x.front());
            y.push_front(y.front());


            for(int i=5; i < x.size()-1; i++)
            {
                if(x.front()==x[i] && y.front()==y[i])
                {
                    gotoxy(WIDTH/2-20,HEIGHT/2);
                    cout<<"Nacisnij dowolny przycisk";
                    GameOver();
                }
                // return 0;
            }
            if(x.front()==0 || x.front() == WIDTH-1|| y.front()==0 || y.front()==HEIGHT)
            {
                gotoxy(WIDTH/2-20,HEIGHT/2);
                cout<<"Nacisnij dowolny przycisk";
                GameOver();
                // return 0;

            }
            bool grow = true;
            size_t l = bonus.size();
            for(size_t  i = 1; i<l; i++)
            {
                if(x.front()==bonusX[i] && y.front() == bonusY[i])
                {
                    score++;
                    grow = false;
                    bonusX[i]= bonusX.front();
                    bonusY[i]= bonusY.front();
                    bonus[i]=bonus.front();

                    bonusX.pop_front();
                    bonusY.pop_front();
                    bonus.pop_front();

                }
            }
            if(grow)
            {
                x.pop_back();
                y.pop_back();
                grow = true;
            }

            gotoxy(x.back(),y.back());
            cout<< (char) 32;
            gotoxy(0,0);
            gotoxy(x.front(),y.front());
            cout<< (char) r;//219
            gotoxy(0,0);
            snake_t=clock();
        }

        if(clock() - bonus_t > bonus_delay)
        {
            bonus_t = clock();
            bonus.push_front(Bon(rand()%3));
            size_t l;
            bonusX.push_front(rand() % (WIDTH-2) +1);
            bonusY.push_front(rand() % (HEIGHT-1) +1);


point:
            l = bonus.size();

            for(size_t i =1 ; i<l; i++)
            {
                if(bonusX.front()== bonusX[i] && bonusY.front() == bonusY[i])
                {
                    bonusX.front()=(rand() %(WIDTH-2))+1;
                    bonusY.front()=(rand() %(HEIGHT-1))+1;
                    goto point;
                }
            }

            l = x.size();

            for(size_t i =0 ; i<l; i++)
            {
                if(bonusX.front()== x[i] && bonusY.front() == y[i])
                {

                    bonusX.front()=(rand() % (WIDTH-1))+1;
                    bonusY.front()=(rand() % (HEIGHT-1))+1;
                    goto point;
                }
            }


            gotoxy(bonusX.front(), bonusY.front());

            switch(bonus.front())
            {
            case GROW:
                SetConsoleTextAttribute(h,8);
                break;
            case DELAY:
                SetConsoleTextAttribute(h, 9);
                break;
            case SPEED:
                SetConsoleTextAttribute(h, 10);
                break;
            }

            cout<< (char) 219;
            gotoxy(0,0);
        }
    }

    return 0;
}
