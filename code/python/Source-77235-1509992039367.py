def  fact(n):
	if n==1:
		return n
	return n*fact(n-1)

n = int(input())
print fact()