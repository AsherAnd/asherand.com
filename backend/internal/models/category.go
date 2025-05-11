package models

type Category struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Subcategory struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

func containsCategory(list []Category, id int) bool {
	for _, c := range list {
		if c.ID == id {
			return true
		}
	}
	return false
}

func containsSubcategory(list []Subcategory, id int) bool {
	for _, s := range list {
		if s.ID == id {
			return true
		}
	}
	return false
}
