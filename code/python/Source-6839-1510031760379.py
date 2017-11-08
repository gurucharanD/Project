def fact(n):
	if n==1:
		return n
	return n*fact(n-1)

n  = int(raw_input())
print fact(n-1)