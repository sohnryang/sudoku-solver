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
                mask &= ~(1 << (board[y][x] - 1));
        for (int x = 0; x < 9; ++x) {
            if (board[y][x] == 0) cand[y][x] &= (~mask);
            else cand[y][x] = 0;
        }
    }

    // vertical
    for (int x = 0; x < 9; ++x) {
        int mask = (1 << 9) - 1; // 0b111111111
        for (int y = 0; y < 9; ++y)
            if (board[y][x] != 0)
                mask &= ~(1 << (board[y][x] - 1));
        for (int y = 0; y < 9; ++y) {
            if (board[y][x] == 0) cand[y][x] &= (~mask);
            else cand[y][x] = 0;
        }
    }

    // boxes
    const int box_position[9][2] = {
        {0, 0}, {3, 0}, {6, 0},
        {3, 0}, {3, 3}, {3, 6},
        {6, 0}, {6, 3}, {6, 6}
    };
    for (int i = 0; i < 9; ++i) {
        int mask = (1 << 9) - 1; // 0b111111111
        int pos[2] = {box_position[i][0], box_position[i][0]};
        for (int j = pos[0]; j < pos[0] + 3; ++j) {
            for (int k = pos[1]; k < pos[1] + 3; ++k)
                if (board[j][k] != 0)
                    mask &= ~(1 << (board[j][k] - 1));
            for (int k = pos[1]; k < pos[1] + 3; ++k) {
				if (board[j][k] == 0) cand[j][k] &= (~mask);
				else cand[j][k] = 0;
			}
		}
    }
}

bool check_solved() {
	for (int y = 0; y < 9; y++)
		for (int x = 0; x < 9; x++)
			if (board[y][x] == 0) return false;
	return true;
}

void iterative_solve() {
	bool end_loop = false;
	while (!check_solved() || !end_loop) {
		end_loop = true;
		for (int y = 0; y < 9; y++) {
			for (int x = 0; x < 9; x++) {
				if (__builtin_popcount(cand[y][x]) == 1) {
					cout << "solved at " << y << ", " << x << '\n';
					board[y][x] = __builtin_ctz(cand[y][x]) + 1;
					end_loop = false;
				}
			}
		}
		generate_candidates();
	}
}

void print_result() {
    for (int y = 0; y < 9; ++y) {
        for (int x = 0; x < 9; ++x)
            cout << board[y][x] << ' ';
        cout << '\n';
    }
}

int main() {
	read_input();
	generate_candidates();
	iterative_solve();
	print_result();
    return 0;
}
