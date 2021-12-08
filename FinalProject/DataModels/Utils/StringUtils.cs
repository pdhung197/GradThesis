using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using static System.Security.Cryptography.HashAlgorithm;

namespace DataModels.Utils
{
    public static class StringUtils
    {
        private const string prefix = "B889TUPCZep4zeuL";

        public static string SafeTrim(this string str)
        {
            return string.IsNullOrWhiteSpace(str) ? string.Empty : str.Trim();
        }

        public static bool SameAs(this string str, string another, bool ignoreCase = true)
        {
            if (string.IsNullOrWhiteSpace(str) && string.IsNullOrWhiteSpace(another))
            {
                return true;
            }

            str = str.SafeTrim();
            another = another.SafeTrim();

            // ReSharper disable once ConvertIfStatementToReturnStatement
            if (ignoreCase)
            {
                return string.Equals(str, another, StringComparison.OrdinalIgnoreCase);
            }

            return string.Equals(str, another);
        }

        public static bool NotSameAs(this string str, string another, bool ignoreCase = true)
        {
            return !str.SameAs(another, ignoreCase);
        }

        public static string Encode(this string password)
        {
            var bytes = Encoding.Unicode.GetBytes(prefix + password);
            // ReSharper disable once PossibleNullReferenceException
            var inArray = Create("SHA1").ComputeHash(bytes);

            return Convert.ToBase64String(inArray);
        }

        public static bool Verify(this string current, string encrypted)
        {
            return string.Equals(current.Encode(), encrypted);
        }

        public static string Replace(this string str, KeyValuePair<string, string> pair)
        {
            return str.Replace("{" + pair.Key + "}", pair.Value);
        }

        public static string FindFirst(this string str, string pattern)
        {
            var matches = Regex.Matches(str, pattern);
            return matches.First().Groups[1].Value;
        }
    }
}