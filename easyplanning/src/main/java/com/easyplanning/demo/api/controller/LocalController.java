package com.easyplanning.demo.api.controller;

import com.easyplanning.demo.domain.common.routes;
import com.easyplanning.demo.domain.dto.LocalDTO;
import com.easyplanning.demo.domain.service.LocalService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = routes.API + routes.Local.LOCAL)


public class LocalController {
@Autowired
    private LocalService localService;

    @PostMapping(value = routes.Local.SAVE_LOCAL)
    public LocalDTO save(@RequestBody LocalDTO localDTO){
        return localService.save(localDTO);
    }

    @GetMapping(value = routes.Local.GET_LOCAL)
    public List<LocalDTO> get(){return localService.getAll();}

    @PutMapping(value =routes.Local.UPDATE_LOCAL)
    public ResponseEntity<?> update(@RequestBody LocalDTO localDTO) {
        Optional<LocalDTO> localDTOOptional = localService.findById(localDTO.getIdLocal());
        if(localDTOOptional.isPresent()) {
            localService.save(localDTO);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
