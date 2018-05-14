#include <iostream>
 
using std::cin;
using std::cout;
 
unsigned int board[9][9];
unsigned int cand[9][9];
 
void read_input() {
    for (int y = 0; y < 9; ++y)
        for (int x = 0; x < 9; ++x)
            cin >> board[y][x];
}
 
void generate_candidates() {
	// horizontal
    for (int y = 0; y < 9; ++y) {
        int mask = (1 << 9) - 1; // 0b111111111
        for (int x = 0; x < 9; ++x)
            if (board[y][x] != 0)
                mask &= 1 << (board[y][x] - 1);
        for (int x = 0; x < 9; ++x) {
            if (board[y][x] == 0) cand[y][x] = mask;
            else cand[y][x] = 0;
    }
 
    // vertical
    for (int x = 0; x < 9; ++x) {
        int mask = (1 << 9) - 1; // 0b111111111
        for (int y = 0; y < 9; ++y)
            if (board[y][x] != 0)
                mask &= 1 << (board[y][x] - 1);
        for (int y = 0; y < 9; ++y) {
            if (board[y][x] == 0) cand[y][x] = mask;
            else cand[y][x] = 0;
    }
 
    // boxes
    for (int i = 0; i < 9; ++i) {
        int mask = (1 << 9) - 1; // 0b111111111
        for (int j = 0; j < 9; ++j) {
 
        }
    }
}
 
void print_result() {
    for (int y = 0; y < 9; ++y) {
        for (int x = 0; x < 9; ++x)
            cout << board[y][x];
        cout << '\n';
    }
}
 
int main() {
	read_input();
	print_result();
    return 0;
}
