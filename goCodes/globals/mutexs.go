package globals

import "sync"

var Mu_M_UsernamePsworld sync.Mutex // Mutex
var Mu_M_UsersSessionCokie sync.Mutex

var Mu_FileLock sync.Mutex
