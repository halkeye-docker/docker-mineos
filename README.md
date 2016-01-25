# docker-mineos
Short version to run my version of mineos

# How to generate credentials

Ugly I know

1. git clone
2. npm install bcrypt
3. node ./auth.js generate \<username\> \<password\>
4. Add to hash /var/games/minecraft/users.json

## Sample users.json

```
{
  "halkeye": {"username":"halkeye","salt":"saltsaltsalt","hash":"hashhashhash"}
}
```

