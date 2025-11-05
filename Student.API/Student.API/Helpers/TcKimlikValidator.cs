using System;
using System.Linq;

namespace StudentManagement.Helpers
{
    public static class TcKimlikValidator
    {
        public static bool IsValid(string tc)
        {
            if (string.IsNullOrEmpty(tc) || tc.Length != 11 || !tc.All(char.IsDigit))
                return false;

            var digits = tc.Select(c => int.Parse(c.ToString())).ToArray();

            if (digits[0] == 0) return false;

            int sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
            int sumEven = digits[1] + digits[3] + digits[5] + digits[7];

            int digit10 = ((sumOdd * 7) - sumEven) % 10;
            if (digit10 != digits[9]) return false;

            int sumAll = digits.Take(10).Sum();
            int digit11 = sumAll % 10;
            if (digit11 != digits[10]) return false;

            return true;
        }
    }
}
