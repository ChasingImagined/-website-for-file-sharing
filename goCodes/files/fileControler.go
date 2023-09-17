package files

import (
	"stajprojesi/goCodes/globals"
	"time"
)

func FileListUpdater(path string, islem bool) {

	if islem {
		if _, ok := globals.M_fileLock[path]; !ok {
			globals.Mu_FileLock.Lock()
			globals.M_fileLock[path] = true
			globals.Mu_FileLock.Unlock()
		} else {

			for _, ok := globals.M_fileLock[path]; ok; {

				time.Sleep(200 * time.Microsecond)

			}
			globals.Mu_FileLock.Lock()
			globals.M_fileLock[path] = true
			globals.Mu_FileLock.Unlock()

		}
	} else {

		globals.Mu_FileLock.Lock()
		delete(globals.M_fileLock, path)
		globals.Mu_FileLock.Unlock()

	}

}
