package com.easyplanning.demo.domain.service;


import com.easyplanning.demo.domain.dto.UsuarioDTO;
import com.easyplanning.demo.domain.mapper.UsuarioMapper;
import com.easyplanning.demo.persistence.entity.Usuario;
import com.easyplanning.demo.persistence.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioDTO save(UsuarioDTO usuarioDTO) {
        usuarioRepository.save(UsuarioMapper.toEntity(usuarioDTO));
        return usuarioDTO;
    }
    public List<UsuarioDTO> getAll() {
        return usuarioRepository.findAll().stream().map(UsuarioMapper::toDTO).collect(Collectors.toList());
    }

    public Optional<UsuarioDTO> findById(String id) {
        return usuarioRepository.findById(id).map(UsuarioMapper::toDTO);
    }

    public Optional<UsuarioDTO> findByEmailAndClave(String email, String password) {
        Usuario Email = usuarioRepository.findByEmailAndClave(email, password);
        if (Email != null) {
            return Optional.of(UsuarioMapper.toDTO(Email));
        } else {
            return Optional.empty();
        }
    }
}